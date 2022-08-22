import {scene} from "../igua/scene";
import {Graphics} from "pixi.js";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {progress} from "../igua/data/progress";
import {pcolord} from "../utils/toHexColorString";

export const resolveFakeWall = resolveGameObject('FakeWall', e => fakeWall(e.width, e.height).at(e));

function fakeWall(width: number, height: number) {
    const color = pcolord(scene.terrainColor).darken(Math.min(0.5, 0.005 + .0125 * progress.levels.intelligence)).toPixi();
    return new Graphics()
        .beginFill(color)
        .drawRect(0, 0, width, height);
}