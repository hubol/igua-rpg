import {Pseudo} from "../utils/math/makePseudo";
import {container} from "../utils/pixi/container";
import {nlerp} from "../utils/math/number";
import {vnew} from "../utils/math/vector";
import {DisplayObject, Sprite} from "pixi.js";
import {CapitalBricks} from "../textures";
import {getWorldBounds} from "../igua/gameplay/getCenter";

const bw = 11;
const bh = 5;

const columns = 5;
const rows = 3;

const tw = CapitalBricks.width;
const th = CapitalBricks.height;

export function capitalBricks(width: number, height: number, p: Pseudo) {
    const c = container();
    if (height < th || width < tw)
        return c;
    Sprite.from(CapitalBricks).hide().show(c);
    height = Math.min(Math.ceil(nlerp(35, 64, p.unit())), height);
    const at = vnew();
    while (c.height < height) {
        at.x = 0;
        const rw = width - at.x;

        row(rw, p).at(at).show(c);
        at.y += bh * 2;
    }

    while (c.height > height)
        c.removeChildAt(c.children.length - 1);

    return c;
}

export function capitalBricksWall(width: number, height: number, p: Pseudo) {
    const c = container();
    const d = 128;
    for (let x = 0; x < width; x += d) {
        for (let y = 0; y < height; y += d) {
            capitalBricks(Math.min(128, width - x), Math.min(128, height - y), p).at(x, y).show(c);
        }
    }
    console.log(c);
    return c;
}

export function manyCapitalBricks(ds: DisplayObject[], p: Pseudo) {
    const c = container();
    for (const d of ds) {
        const b = getWorldBounds(d);
        b.add(3, 3);
        capitalBricks(b.width - 6, b.height - 6, p).at(b).show(c);
    }
    return c;
}

function row(width: number, p: Pseudo) {
    const c = container();
    const at = vnew();
    while (c.width < width) {
        let dx = bx(p.int() % (width - tw - at.x));
        if (isNaN(dx) || !isFinite(dx) || dx < bw)
            dx = bw;
        at.x += dx;
        if (at.x + tw >= width)
            break;
        if (p.bool())
            continue;
        const s = Sprite.from(CapitalBricks).at(at).show(c);
        if (p.bool())
            hflip(s);
        if (p.bool())
            vflip(s);
    }
    return c;
}

function bx(x: number) {
    return Math.min(Math.floor(x / bw) * bw, columns * bw);
}

function hflip(s: Sprite) {
    s.scale.x = -1;
    s.pivot.x = tw + 3;
}

function vflip(s: Sprite) {
    s.scale.y = -1;
    s.pivot.y = 14;
}