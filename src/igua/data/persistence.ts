import {getInitialProgress, Progress, progress, setProgress} from "./progress";
import {show} from "../../cutscene/dialog";
import {localStorageEntry} from "../../utils/browser/localStorageEntry";
import {level} from "../level/level";
import {stringify} from "../../utils/string/stringify";
import {Sprite} from "pixi.js";
import {FloppyDisk} from "../../textures";
import {game} from "../game";
import {sleep} from "../../cutscene/sleep";
import {truncate} from "../../utils/string/truncate";
import {readAndConvertProgressFile} from "./readAndConvertProgressFile";
import {ChooseYourLooksBeginning} from "../../levels/chooseYourLooks";
import {sceneStack} from "../scene";
import {player} from "../../gameObjects/player";

export enum SaveFile {
    Slot1 = "file1",
    Slot2 = "file2",
    Slot3 = "file3",
}

let currentSaveFile = SaveFile.Slot1;
const lastPlayedSaveFileEntry = localStorageEntry<SaveFile>('lastLoadedSaveFile');

function saveLastPlayedSaveFile() {
    lastPlayedSaveFileEntry.write(currentSaveFile);
}

function readLastPlayedSaveFile() {
    try {
        return lastPlayedSaveFileEntry.read();
    }
    catch (e) {
        console.error(`Something went wrong while reading the lastLoadedSaveFile:`);
        console.error(e);
        return undefined;
    }
}

export const persistence = {
    async peek() {
        try {
            const { file1, file2, file3, errors } = await peekAtFilesOrGracefulError();

            for (const error of errors) {
                await show(error!);
            }

            const lastPlayedSaveFile = errors.length === 0 ? readLastPlayedSaveFile() : undefined;
            return {
                file1,
                file2,
                file3,
                lastPlayedSaveFile
            }
        }
        catch (e) {
            console.error(`Error while peeking at save files`, e);
            await show(`A fatal error occurred while reading save files.
${truncate(stringify(e), 60)}`);
        }
    },
    new(file: SaveFile) {
          currentSaveFile = file;
          setProgress(getInitialProgress());
          sceneStack.replace(ChooseYourLooksBeginning);
    },
    async save() {
        try {
            if (player?.isDead)
                return console.log('Player is dead. Preventing save.');
            showFloppy();
            localStorageEntry(currentSaveFile).write(progress);
            localStorageEntry(currentSaveFile).read();
            saveLastPlayedSaveFile();
        }
        catch (e) {
            console.error(`Error while saving ${currentSaveFile}`, e);
            await show(`An error occurred while saving. Proceed with caution.
${truncate(stringify(e), 60)}`);
        }
    },
    async load(file = currentSaveFile) {
        try {
            let progress = await readAndConvertProgressFile(file);
            if (!progress)
                throw new Error(`${file} is empty.`);

            setProgress(progress);
            currentSaveFile = file;
            saveLastPlayedSaveFile();
            level.goto(progress.levelName);
        }
        catch (e) {
            console.error(`Error while loading ${file}`, e);
            await show(`A fatal error occurred while loading:
${truncate(stringify(e), 60)}`);
        }
    }
}

async function peekAtFilesOrGracefulError() {
    const file1 = await readOrConvertOrError(SaveFile.Slot1);
    const file2 = await readOrConvertOrError(SaveFile.Slot2);
    const file3 = await readOrConvertOrError(SaveFile.Slot3);

    return {
        file1: file1.progress,
        file2: file2.progress,
        file3: file3.progress,
        errors: [file1, file2, file3].map(x => x.error).filter(x => !!x),
    }
}

type OkRead = { status: 'ok', progress?: Progress, error: undefined };
type BadRead = { status: 'error', error: string, progress: undefined };
type ReadResult = OkRead | BadRead;

async function readOrConvertOrError(file: string): Promise<ReadResult> {
    try {
        return { status: 'ok', progress: await readAndConvertProgressFile(file), error: undefined };
    }
    catch (e) {
        console.error(`File ${file} is damaged!`);
        console.error(e);
        return { status: 'error', progress: undefined, error: `File ${file} is damaged:
${truncate(stringify(e), 60)}` };
    }
}

function showFloppy() {
    const f = Sprite.from(FloppyDisk).withAsync(async () => {
        await sleep(2000);
        f.destroy();
    }).at(250, 6);
    f.anchor.set(1, 0);
    game.hudStage.addChild(f);
}
