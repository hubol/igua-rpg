import {Vector, vnew} from "../../utils/math/vector";
import {push} from "../../gameObjects/walls";
import {player} from "../../gameObjects/player";

const v = vnew();

export function rayIntersectsWall(start: Vector, unit: Vector, length = 256, radius = 4) {
    for (let i = 0; i < length; i += radius * 2) {
        v.at(start).add(unit, i);
        const r = push(v, radius);
        if (r.hitWall || r.hitCeiling || r.hitGround)
            return true;
    }
    return false;
}

export function rayIntersectsWallDistance(start: Vector, unit: Vector, length = 512, radius = 4) {
    for (let i = 0; i < length; i += radius * 2) {
        v.at(start).add(unit, i);
        const r = push(v, radius);
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