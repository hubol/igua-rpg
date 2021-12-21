import {onKey} from "../../utils/browser/onKey";
import {showDevMessage} from "./showDevMessage";
import {persistence} from "../data/persistence";

export function devPersistence()
{
    onKey('Digit5').up(async () => {
        await persistence.save();
        showDevMessage("Save");
    });

    onKey('Digit6').up(async () => {
        await persistence.load();
        showDevMessage("Load");
    });
}
