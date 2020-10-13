import {getLevelApplicator, LevelApplicator} from "./getLevelApplicator";
import {progress} from "../data/progress";
import {sceneStack} from "../scene";

export const level = {
    goto(levelName: string)
    {
        sceneStack.pop();
        sceneStack.push();
        this.current = getLevelApplicator(levelName);
        this.current();
        progress.levelName = levelName;
    },
    current: null as unknown as LevelApplicator,
    width: 0,
    height: 0
}