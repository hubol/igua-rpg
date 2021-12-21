import {getInitialProgress, Progress, progress, setProgress} from "./progress";
import {show} from "../../cutscene/dialog";
import {sleep} from "../../cutscene/sleep";
import {localStorageEntry} from "../../utils/browser/localStorageEntry";
import {level} from "../level/level";
import {stringify} from "../../utils/stringify";

let currentSaveFile = "file1";

export const persistence = {
    async save() {
        try {
            localStorageEntry(currentSaveFile).write(progress);
            localStorageEntry(currentSaveFile).read();
        }
        catch (e) {
            console.error(`Error while saving ${currentSaveFile}`, e);
            await sleep(2000);
            await show("An error occurred while saving. Proceed with caution.");
        }
    },
    async load(okIfEmpty = false, file = currentSaveFile) {
        try {
            let progress = localStorageEntry<Progress>(file).read();
            if (!progress) {
                if (!okIfEmpty)
                    throw new Error(`${file} is empty.`);
                progress = getInitialProgress();
            }

            setProgress(progress);
            currentSaveFile = file;
            level.goto(progress.levelName);
        }
        catch (e) {
            console.error(`Error while loading ${file}`, e);
            await sleep(2000);
            await show(`A fatal error occurred while loading:
${truncate(stringify(e), 60)}`);
        }
    }
}

function truncate(string, length) {
    if (string.length > length)
        return string.slice(0, length - 3) + "...";
    return string;
}
