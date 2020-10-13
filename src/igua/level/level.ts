import {getLevelApplicator} from "./getLevelApplicator";
import {progress} from "../data/progress";
import {sceneStack} from "../scene";

export const level = {
    goto(levelName: string)
    {
        sceneStack.pop();
        sceneStack.push();
        getLevelApplicator(levelName)();
        progress.levelName = levelName;
    },
    width: 0,
    height: 0
}