import * as sounds from "./sounds";
import {sleep} from "./utils/sleep";

export async function loadSoundsAsync()
{
    while (true)
    {
        let allLoaded = true;

        for (let sound in sounds)
        {
            if (sounds[sound].state() !== "loaded")
            {
                allLoaded = false;
                break;
            }
        }

        if (allLoaded)
            return;

        await sleep(167);
    }
}