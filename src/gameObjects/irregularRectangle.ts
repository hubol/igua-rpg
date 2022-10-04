import {Graphics} from "pixi.js";
import {makePseudo} from "../utils/math/makePseudo";

export function irregularRectangle(width: number, height: number, seed: number, range = 16) {
    const p = makePseudo(seed);
    const rangert = Math.sqrt(range) + range;
    const max = 24;

    const c = new Graphics()
        .beginFill(0xffffff);

    c.moveTo(p.unit() * rangert, p.unit() * rangert);

    for (let i = c.pen.x + p.int() % max; i < width; i += p.int() % max)
        c.lineTo(i, p.unit() * range);
    c.lineTo(width - (p.unit() * rangert), p.unit() * rangert);

    for (let i = c.pen.y + p.int() % max; i < height; i += p.int() % max)
        c.lineTo(width - (p.unit() * range), i);
    c.lineTo(width - (p.unit() * rangert), height - (p.unit() * rangert));

    for (let i = c.pen.x - p.int() % max; i > 0; i -= p.int() % max)
        c.lineTo(i, height - (p.unit() * range));
    c.lineTo(p.unit() * rangert, height - (p.unit() * rangert));

    for (let i = c.pen.y - p.int() % max; i > 0; i -= p.int() % max)
        c.lineTo(p.unit() * range, i);
    c.closePath();

    c.cacheAsBitmap = true;
    return c;
}