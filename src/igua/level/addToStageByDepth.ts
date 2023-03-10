import {DisplayObject} from "pixi.js";
import {scene} from "../scene";

export function addToStageByDepth(o: DisplayObject, depth = 0) {
    if (o.parent)
        return o;
    switch (depth) {
        case 7:
            return o.ahead();
        case 6:
            return scene.terrainDecalsStage.addChild(o);
        case 5:
            return scene.parallax1Stage.addChildAt(o, 0);
        case 4:
            return scene.parallax1Stage.addChild(o);
        case 3:
            return scene.backgroundGameObjectStage.addChildAt(o, 0);
        case 2:
            return scene.backgroundGameObjectStage.addChild(o);
        case 1:
            return scene.gameObjectStage.addChildAt(o, 0);
        default:
            return scene.gameObjectStage.addChild(o);
    }
}
