import {getSceneSource} from "./getSceneSource";
import {sceneStack} from "../scene";

export const level = {
    goto(levelName: string) {
        const source = getSceneSource(levelName);
        sceneStack.replace(source);
    },
}
