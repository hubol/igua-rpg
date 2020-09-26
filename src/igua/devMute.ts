import { Howler } from "howler";

export function devMute()
{
    Howler.volume(0);
    document.addEventListener("keyup", ev => {
        if (ev.code !== "KeyM")
            return;

        Howler.volume(!!(Howler.volume()) ? 0 : 1);
    });
}