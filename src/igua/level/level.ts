import {game} from "../game";
import {RecycleablePromiseLibrary} from "../../cutscene/recycleablePromiseLibrary";
import {sleep} from "pissant";
import {getLevelApplicator} from "./getLevelApplicator";
import {progress} from "../progress";

const levelRecycleablePromiseLibrary = new RecycleablePromiseLibrary();

export const level = {
    get promiseLibrary()
    {
        return levelRecycleablePromiseLibrary.promiseLibrary;
    },
    async goto(levelName: string)
    {
        game.applicationTicker.stop();
        await sleep(250);
        unloadLevel();
        getLevelApplicator(levelName)();
        progress.levelName = levelName;
        game.applicationTicker.start();
    }
}

function unloadLevel()
{
    game.terrainStage.removeAllChildren();
    game.pipeStage.removeAllChildren();
    game.gameObjectStage.removeAllChildren();
    levelRecycleablePromiseLibrary.recycle();
}