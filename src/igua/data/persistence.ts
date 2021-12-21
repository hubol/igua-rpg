import {getInitialProgress, Progress, progress, setProgress} from "./progress";
import {show} from "../../cutscene/dialog";
import {localStorageEntry} from "../../utils/browser/localStorageEntry";
import {level} from "../level/level";
import {stringify} from "../../utils/stringify";
import {Sprite} from "pixi.js";
import {FloppyDisk} from "../../textures";
import {game} from "../game";
import { sleep } from "../../cutscene/sleep";

let currentSaveFile = "file1";

export const persistence = {
    async save() {
        try {
            showFloppy();
            localStorageEntry(currentSaveFile).write(progress);
            localStorageEntry(currentSaveFile).read();
        }
        catch (e) {
            console.error(`Error while saving ${currentSaveFile}`, e);
            await show(`An error occurred while saving. Proceed with caution.
${truncate(stringify(e), 60)}`);
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

function showFloppy() {
    const f = Sprite.from(FloppyDisk).withAsync(async () => {
        await sleep(2000);
        f.destroy();
    }).at(250, 6);
    f.anchor.set(1, 0);
    game.hudStage.addChild(f);
}
