import {Container, DisplayObject} from "pixi.js";
import {scene} from "./scene";

export function findStage(o: DisplayObject): Container {
    if (!o)
        return scene.gameObjectStage;
    if (o === scene.playerStage || o === scene.gameObjectStage || o === scene.backgroundGameObjectStage || o === scene.cameraStage || o === scene.parallax1Stage)
        return o as Container;
    return findStage(o.parent);
}
