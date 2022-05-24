import {DisplayObject} from "pixi.js";
import {Vector, vnew} from "../../utils/math/vector";
import {push, Pushable} from "../walls";

export function newGravity(target: DisplayObject, speed: Vector, offset: Vector, radius: number) {
    const pushable: Pushable = vnew();
    return (gravity: number) => {
        pushable.at(target).add(offset).add(speed);
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
        target.at(pushable).add(offset, -1);

        return r;
    }
}