import {onKey} from "../../utils/browser/onKey";
import {showDevMessage} from "./showDevMessage";
import {progress} from "../data/progress";

export function devMiscCommands()
{
    onKey('Digit1').up(async () => {
        progress.flags.global.somethingGreatHappened = !progress.flags.global.somethingGreatHappened;
        showDevMessage(`Set somethingGreatHappened to ${progress.flags.global.somethingGreatHappened}`);
    });
}
