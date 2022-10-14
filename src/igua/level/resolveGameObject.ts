import {GameObjectArgs} from "../../../tools/gen-levelargs/types/gameObjectArgs";
import {DisplayObject} from "pixi.js";
import {addToStageByDepth} from "./addToStageByDepth";
import {makeGameObjectResolver} from "../../../tools/gen-levelargs/gameObjectResolver";

export function resolveGameObject<T>(type: string, resolve: (args: GameObjectArgs) => T) {
    const wrappedResolve = function (e: Partial<GameObjectArgs>) {
        const x = resolve(e as any);
        if (x instanceof DisplayObject)
            addToStageByDepth(x, e.depth);
        return x;
    };
    makeGameObjectResolver(wrappedResolve, type);
    return wrappedResolve;
}
