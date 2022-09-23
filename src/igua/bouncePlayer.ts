import {Vector} from "../utils/math/vector";
import {player} from "../gameObjects/player";
import {rectangleCircleOverlap} from "../utils/math/rectangleCircleOverlap";
import {DisplayObject, Rectangle} from "pixi.js";
import {scene} from "./scene";

export function bouncePlayer(self: Vector, factor = 3) {
    const dir = player.vcpy().add(0, -8).add(self, -1).normalize().scale(factor);
    knockbackPlayer(dir);
    return dir;
}

export function knockbackPlayer(v: Vector) {
    player.hspeed = 0;
    player.engine.knockback.y = 0;
    player.engine.knockback.x = v.x;
    player.vspeed = v.y;
}

export function bouncePlayerOffDisplayObject(d: DisplayObject, factor = 3) {
    const v = d.getBounds(false, r).center.add(scene.camera);
    return bouncePlayer(v, factor);
}

const r = new Rectangle();

export function bouncePlayerCircleConditionally(self: Vector, radius: number, factor = 3) {
    player.getBounds(false, r);
    if (rectangleCircleOverlap(radius, self.x - scene.camera.x, self.y - scene.camera.y, r.x, r.y, r.x + r.width, r.y + r.height)) {
        bouncePlayer(self, factor);
        return true;
    }
    return false;
}
