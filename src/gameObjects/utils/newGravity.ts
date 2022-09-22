import {DisplayObject} from "pixi.js";
import {Vector, vnew} from "../../utils/math/vector";
import {push, Pushable} from "../walls";

export function newGravity(subject: DisplayObject, speed: Vector, offset: Vector, radius: number) {
    return (gravity: number) => applyGravity(subject, speed, offset, radius, gravity)
}

const pushable: Pushable = vnew();
export function applyGravity(subject: DisplayObject, speed: Vector, offset: Vector, radius: number, gravity: number) {
    pushable.at(subject).add(offset).add(speed);
    pushable.hspeed = speed.x;
    pushable.vspeed = speed.y;
    const r = push(pushable, radius);
    if (r.hitCeiling)
        pushable.vspeed = 0;
    if (!r.hitGround && !r.isOnGround)
        pushable.vspeed += gravity;
    else
        pushable.vspeed = 0;
    if (r.hitWall)
        pushable.hspeed = 0;
    speed.at(pushable.hspeed, pushable.vspeed);
    subject.at(pushable).add(offset, -1);

    return r;
}