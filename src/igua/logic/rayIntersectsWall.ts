import {Vector, vnew} from "../../utils/math/vector";
import {push} from "../../gameObjects/walls";
import {player} from "../../gameObjects/player";
import {SceneLocal} from "../sceneLocal";
import {Graphics} from "pixi.js";

const v = vnew();

const RayPreview = new SceneLocal(rayPreview, 'RayPreview');
function rayPreview() {
    return new Graphics().beginFill(0xff0000).ahead();
}

let showDebug = false;

export function rayIntersectsWall(start: Vector, unit: Vector, length = 256, radius = 4) {
    return rayIntersectsWallDistance(start, unit, length, radius) < length;
}

export function rayIntersectsWallDistance(start: Vector, unit: Vector, length = 512, radius = 4) {
    for (let i = 0; i < length; i += radius * 2) {
        v.at(start).add(unit, i);
        const r = push(v, radius);
        if (showDebug)
            RayPreview.value.drawCircle(v.x, v.y, radius);
        if (r.hitWall || r.hitCeiling || r.hitGround)
            return i;
    }
    return length;
}

const u = vnew();

export function rayToPlayerIntersectsWall(start: Vector) {
    const diff = rayToPlayer(start);
    const length = diff.vlength;
    return rayIntersectsWall(start, diff.normalize(), length);
}

export function rayToPlayer(start: Vector) {
    return u.at(player).add(start, -1);
}