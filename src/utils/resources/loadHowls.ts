import { Howl} from 'howler';
import {timeoutWaitAsync} from "../promise/timeoutWaitAsync";
import {rng} from "../math/rng";
import {timeout} from "../promise/timeout";

export async function loadHowlsAsync(sounds: Howl[])
{
    await Promise.all(sounds.map(x => loadHowlAsync(x)));
}

export async function loadHowlAsync(howl: Howl)
{
    let errors = 0;
    let err: HowlLoadError;
    await timeoutWaitAsync(async () => {
        const state = howl.state();

        if (state === "loaded") {
            // @ts-ignore
            howl._iguaError = false;
            return true;
        }

        if (err?.isError) {
            // @ts-ignore
            howl._iguaError = true;
            errors++;
            if (errors >= 10)
                throw { message: `Giving up loading Howl`, howl };
            const ms = 150 + rng.int(250) + (errors - 1) * 250;
            console.info(`Retrying Howl.load in ${ms}ms (${errors})...`);
            await timeout(ms);
        }

        // @ts-ignore
        if (state === "unloaded" || howl._iguaError)
            err = load(howl);

        return false;
    }, 167);
}

function load(howl: Howl) {
    const err = { soundId: -1, error: -1, isError: false };
    howl.once('loaderror', (soundId, error) => {
        console.error(`Howl.load caused loaderror. soundId=${soundId} error=${error}`);
        err.soundId = soundId;
        err.error = error as any;
        err.isError = true;
    });
    howl.load();
    return err;
}

type HowlLoadError = ReturnType<typeof load>;
