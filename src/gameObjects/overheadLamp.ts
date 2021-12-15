import {Graphics, Sprite} from "pixi.js";
import {OverheadLamp, OverheadLampLight} from "../textures";
import {merge} from "../utils/merge";
import {container} from "../utils/pixi/container";

export function overheadLamp(height = 256) {
    const light = Sprite.from(OverheadLampLight);
    light.anchor.set(94 / 190, 0);
    const lamp = Sprite.from(OverheadLamp);
    lamp.anchor.set(11 / 24, 1);
    const rope = new Graphics().lineStyle(1, 0x31323F).lineTo(0, -height).at(1, 0);
    return merge(container(light, lamp, rope), { light });
}
