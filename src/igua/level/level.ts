import {getLevelApplicator} from "./getLevelApplicator";
import {progress} from "../data/progress";
import {scene, sceneStack} from "../scene";
import {recreatePlayer} from "../../gameObjects/player";
import {LevelApplicator} from "./levelApplicator";

export const level = {
    goto(levelName: string)
    {
        sceneStack.pop();
        this.current = getLevelApplicator(levelName);
        sceneStack.push(!this.current.isNotLevel);
        if (scene.isLevel)
            recreatePlayer();
        this.current();
        progress.levelName = levelName;
        scene.ticker.update();
    },
    current: null as unknown as LevelApplicator
}
