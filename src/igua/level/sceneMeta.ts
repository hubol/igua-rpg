import {sceneStack} from "../scene";
import {merge} from "../../utils/merge";

export function defaultSceneMeta(): SceneMeta {
    return {
        isLevel: sceneStack.length === 0
    };
}

export interface SceneMeta {
    isLevel: boolean;
}

export function sceneMeta<T>(scene: T, meta: Partial<SceneMeta>) {
    return merge(scene, { meta });
}
