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
        this.clear();
        getLevelApplicator(levelName)();
        progress.levelName = levelName;
        game.applicationTicker.start();
    },
    clear()
    {
        game.terrainStage.removeAllChildren();
        game.pipeStage.removeAllChildren();
        game.backgroundGameObjectStage.removeAllChildren();
        game.gameObjectStage.removeAllChildren();
        levelRecycleablePromiseLibrary.recycle();
    }
}