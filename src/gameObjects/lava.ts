import {Graphics} from "pixi.js";
import {now} from "../utils/now";
import {drawPool} from "./pool";
import {container} from "../utils/pixi/container";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {resolveBlock} from "./walls";
import {getWorldBounds} from "../igua/gameplay/getCenter";

const f = (x: number) => Math.sin(x * 0.2 + now.s + Math.sin(x)) * 2 - 1;

export const resolveLava = resolveGameObject('Lava', (e) => lava(e.width, e.height).at(e));

export function lava(width: number, height: number) {
    const mask = new Graphics().drawRect(0, 0, width, height).hide();
    const g = new Graphics()
        .withStep(() => {
            g.clear().lineStyle(1, 0xECD51F).beginFill(0xDD4335);
            drawPool(g, width, height, f);
        })
    return container(mask, g)
        .on('added', () => {
            resolveBlock({ ...getWorldBounds(mask), width: mask.width, height: mask.height } as any);
        });
}