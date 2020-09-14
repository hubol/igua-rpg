import { Howl } from 'howler';
import {wait} from "pissant";

export async function loadHowlsAsync(sounds: Howl[])
{
    // TODO impl using loadHowlAsync
    return wait(() => {
        let allLoaded = true;

        for (let sound of sounds)
        {
            const state = sound.state();

            if (state === "loaded")
                continue;

            if (state === "unloaded")
                sound.load();

            allLoaded = false;
        }

        return allLoaded;
    },
    167);
}

export async function loadHowlAsync(howl: Howl)
{
    return wait(() => {
        const state = howl.state();

        if (state === "loaded")
            return true;

        if (state === "unloaded")
            howl.load();

        return false;
    }, 167);
}