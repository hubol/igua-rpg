import {scene} from "../igua/scene";
import {Graphics} from "pixi.js";
import {resolveGameObject} from "../igua/level/resolveGameObject";

export const resolveFakeWall = resolveGameObject('FakeWall', e => fakeWall(e.width, e.height).at(e));

function fakeWall(width: number, height: number) {
    return new Graphics()
        .beginFill(0xffffff)
        .drawRect(0, 0, width, height)
        .tinted(scene.terrainColor - 5);
}