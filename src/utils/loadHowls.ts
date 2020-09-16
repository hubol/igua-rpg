import { Howl } from 'howler';
import {wait} from "pissant";

export async function loadHowlsAsync(sounds: Howl[])
{
    await Promise.all(sounds.map(x => loadHowlAsync(x)));
}

export async function loadHowlAsync(howl: Howl)
{
    await wait(() => {
        const state = howl.state();

        if (state === "loaded")
            return true;

        if (state === "unloaded")
            howl.load();

        return false;
    }, 167);
}