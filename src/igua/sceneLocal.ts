import {scene, Scene} from "./scene";
import {getOrEmpty} from "../utils/getOrEmpty";

export class SceneLocal<T>
{
    private static _idSource = 0;

    constructor(private readonly _factory: (scene: Scene) => T, private readonly _sceneExtKey = `Anonymous@${SceneLocal._idSource++}`) { }

    get value(): T
    {
        const ext = getOrEmpty(scene.ext, 'sceneLocal');
        const value = ext[this._sceneExtKey];
        if (value)
            return value;

        return ext[this._sceneExtKey] = this._factory(scene);
    }
}