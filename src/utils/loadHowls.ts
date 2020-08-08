import { Howl } from 'howler';
import {wait} from "pissant";

export async function loadHowlsAsync(sounds: Howl[])
{
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