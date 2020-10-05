import {game} from "../game";
import {RecycleablePromiseLibrary} from "../../cutscene/recycleablePromiseLibrary";
import {sleep} from "pissant";
import {getLevelApplicator} from "./getLevelApplicator";
import {progress} from "../progress";

let levelRecycleablePromiseLibrary: RecycleablePromiseLibrary | null;

export const level = {
    get recycleablePromiseLibrary()
    {
        return levelRecycleablePromiseLibrary ?? (levelRecycleablePromiseLibrary = new RecycleablePromiseLibrary());
    },
    get promiseLibrary()
    {
        return this.recycleablePromiseLibrary.promiseLibrary;
    },
    async goto(levelName: string)
    {
        game.applicationTicker.stop();
        await sleep(250);
        this.gotoSync(levelName);
        game.applicationTicker.start();
    },
    gotoSync(levelName: string)
    {
        this.clear();
        getLevelApplicator(levelName)();
        progress.levelName = levelName;
    },
    clear()
    {
        game.terrainStage.removeAllChildren();
        game.pipeStage.removeAllChildren();
        game.parallax1Stage.removeAllChildren();
        game.backgroundGameObjectStage.removeAllChildren();
        game.gameObjectStage.removeAllChildren();
        this.recycleablePromiseLibrary.recycle();
    }
}