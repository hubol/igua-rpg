import {game} from "../game";
import {sleep} from "pissant";
import {getLevelApplicator} from "./getLevelApplicator";
import {progress} from "../progress";
import {sceneStack} from "../scene";

export const level = {
    async goto(levelName: string)
    {
        game.applicationTicker.stop();
        await sleep(250);
        this.gotoSync(levelName);
        game.applicationTicker.start();
    },
    gotoSync(levelName: string)
    {
        sceneStack.pop();
        sceneStack.push();
        getLevelApplicator(levelName)();
        progress.levelName = levelName;
    }
}