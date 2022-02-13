import {getSceneSource} from "./getSceneSource";
import {sceneStack} from "../scene";

export const level = {
    goto(levelName: string) {
        const source = getSceneSource(levelName);
        if (!source)
            throw new Error(`No source for levelName=${levelName}`);
        sceneStack.replace(source);
    },
}
