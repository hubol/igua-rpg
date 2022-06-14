import {Graphics} from "pixi.js";
import {drawPool} from "./pool";
import {container} from "../utils/pixi/container";
import {range} from "../utils/range";
import {now} from "../utils/now";

export function heatWaves(width: number, height: number) {
    const f = (i: number) => (x: number) => Math.sin(x * (0.02 + i / 32) + now.s * (1 + i / 16 + Math.sin(i * 2) * 0.3) - i * 2) * 4;
    const g = range(6).map((i) => {
        const ff = f(i);
        const g = new Graphics()
            .withStep(() => {
                g.clear().beginFill(0xFFE451);
                drawPool(g, width, height, ff);
            })
        g.alpha = 0.167;
        g.y -= i * 12;
        return g;
    });
    return container(...g);
}