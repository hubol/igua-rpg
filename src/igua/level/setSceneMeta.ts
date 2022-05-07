import {sceneStack} from "../scene";
import {merge} from "../../utils/object/merge";

export function defaultSceneMeta(): SceneMeta {
    return {
        isLevel: sceneStack.length === 0,
    };
}

export interface SceneMeta {
    isLevel: boolean;
    name?: string;
}

export function setSceneMeta<T>(scene: T, meta: Partial<SceneMeta>) {
    if ('meta' in scene) {
        // @ts-ignore
        merge(scene.meta, meta);
        return;
    }
    merge(scene, { meta });
}
