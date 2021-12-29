import {getSceneSource} from "./getSceneSource";
import {sceneStack} from "../scene";

export const level = {
    goto(levelName: string)
    {
        sceneStack.pop();
        const source = getSceneSource(levelName);
        sceneStack.push(source);
    },
}
