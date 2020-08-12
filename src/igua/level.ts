import {game} from "./game";
import {RecycleablePromiseLibrary} from "../cutscene/recycleablePromiseLibrary";
import {sleep} from "pissant";
import {getLevelEntrypoint} from "../getLevelEntrypoint";
import {progress} from "./progress";

const levelRecycleablePromiseLibrary = new RecycleablePromiseLibrary();

export function getLevelPromiseLibrary()
{
    return levelRecycleablePromiseLibrary.promiseLibrary;
}

export async function gotoLevel(levelName: string)
{
    game.applicationTicker.stop();
    await sleep(250);
    unloadLevel();
    getLevelEntrypoint(levelName)();
    progress.levelName = levelName;
    game.applicationTicker.start();
}

export function unloadLevel()
{
    game.terrainStage.removeAllChildren();
    game.pipeStage.removeAllChildren();
    game.gameObjectStage.removeAllChildren();
    levelRecycleablePromiseLibrary.recycle();
}