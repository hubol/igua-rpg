import { Howl } from 'howler';
import {sleep} from "./sleep";

export async function loadHowlsAsync(sounds: Howl[])
{
    while (true)
    {
        let allLoaded = true;

        for (let sound of sounds)
        {
            const state = sound.state();

            if (state === "loaded")
                continue;

            if (state === "unloaded")
                sound.load();

            allLoaded = false;
            break;
        }

        if (allLoaded)
            return;

        await sleep(167);
    }
}