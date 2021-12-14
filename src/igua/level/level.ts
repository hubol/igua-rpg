import {getLevelApplicator, LevelApplicator} from "./getLevelApplicator";
import {progress} from "../data/progress";
import {scene, sceneStack} from "../scene";
import {recreatePlayer} from "../../gameObjects/player";

export const level = {
    goto(levelName: string)
    {
        sceneStack.pop();
        sceneStack.push();
        recreatePlayer();
        this.current = getLevelApplicator(levelName);
        this.current();
        progress.levelName = levelName;
        scene.ticker.update();
    },
    current: null as unknown as LevelApplicator
}
