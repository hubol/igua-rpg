import {Vector} from "../utils/math/vector";
import {Graphics} from "pixi.js";

export function trace(v: Vector[]) {
    const g = new Graphics();
    g.lineStyle(2);
    if (v[0])
        g.moveTo(v[0].x, v[0].y);
    for (let i = 0; i < v.length; i++)
        g.lineTo(v[i].x, v[i].y);
    return g;
}