import { Howler } from "howler";
import {onKey} from "../../utils/browser/onKey";

export function devMute()
{
    Howler.volume(0);
    onKey('KeyM').up(() => Howler.volume(!!(Howler.volume()) ? 0 : 1));
}
