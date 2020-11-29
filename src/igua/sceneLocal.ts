import {scene, Scene, sceneStack} from "./scene";

export class SceneLocal<T>
{
    private readonly _scenes: Scene[] = [];
    private readonly _values: T[] = [];

    constructor(private readonly _factory: (scene: Scene) => T) { }

    get value(): T
    {
        const indexOfScene = this._scenes.indexOf(scene);
        if (indexOfScene > -1)
            return this._values[indexOfScene];
        if (sceneStack.length === 1)
        {
            this._scenes.length = 0;
            this._values.length = 0;
        }

        this._scenes.push(scene);
        return this._values[this._scenes.length - 1] = this._factory(scene);
    }
}