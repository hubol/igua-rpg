import { Howler } from "howler";
import {onKey} from "../../utils/browser/onKey";
import {showDevMessage} from "./showDevMessage";

export function devMute()
{
    Howler.volume(0);
    onKey('KeyM').up(() => {
        Howler.volume(!!(Howler.volume()) ? 0 : 1);
        if (Howler.volume() > 0)
            showDevMessage("Unmuted");
        else
            showDevMessage("Muted");
    });
}
