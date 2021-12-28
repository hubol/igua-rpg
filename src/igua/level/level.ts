import {getSceneApplicator} from "./getSceneApplicator";
import {progress} from "../data/progress";
import {scene, sceneStack} from "../scene";
import {recreatePlayer} from "../../gameObjects/player";
import {SceneApplicator} from "./sceneApplicator";

export const level = {
    goto(levelName: string)
    {
        sceneStack.pop();
        this.current = getSceneApplicator(levelName);
        sceneStack.push(!this.current.isNotLevel);
        if (scene.isLevel) {
            recreatePlayer();
            progress.levelName = levelName;
        }
        this.current();
        scene.ticker.update();
    },
    current: null as unknown as SceneApplicator
}
