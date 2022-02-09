import {Graphics} from "pixi.js";
import {now} from "../utils/now";
import {resolveGameObject} from "../igua/level/resolveGameObject";

export const resolvePool = resolveGameObject('Pool', e => pool(e.width, e.height).at(e));

export function pool(width: number, height: number) {
    const g = new Graphics().withStep(() => {
        g.clear().beginFill(0xffffff);
        const xmax = width;
        const ymax = height;
        let x = 0;
        g.moveTo(0, ymax);
        while (true) {
            const y = Math.sin(now.s * 1.5 + x * 0.1) * 4;
            g.lineTo(x, Math.round(y));
            if (x >= xmax)
                break;
            x = Math.min(xmax, x + 4);
        }
        g.lineTo(xmax, ymax);
        g.lineTo(0, ymax);
    });
    g.tint = 0xA9CFA6;

    return g;
}