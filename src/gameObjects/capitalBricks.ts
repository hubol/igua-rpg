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
    height = Math.ceil(nlerp(th, height, p.unit()));
    let iter = 0;
    while (c.height < height) {
        const prev = c.children[c.children.length - 1];
        const at = prev?.vcpy() ?? vnew();
        at.x = bx(p.int() % (width - tw));
        if (iter > 0)
            at.y += by(p.int() % (height - th - at.y));

        const rw = width - at.x;

        if ((prev && prev.x === at.x && prev.y === at.y) || rw < tw || ++iter >= 16)
            break;

        row(rw, p).at(at).show(c);
    }

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
    width = Math.ceil(nlerp(tw, width, p.unit()));
    const c = container();
    let iter = 0;
    while (c.width < width) {
        const prev = c.children[c.children.length - 1];
        const at = prev?.vcpy() ?? vnew();
        at.x += bx(p.int() % (width - tw - at.x));
        if (prev && prev.x === at.x || ++iter >= 16)
            break;
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

function by(y: number) {
    return Math.min(Math.floor(y / bh) * bh * 2, rows * bh);
}

function hflip(s: Sprite) {
    s.scale.x = -1;
    s.pivot.x = tw + 3;
}

function vflip(s: Sprite) {
    s.scale.y = -1;
    s.pivot.y = 14;
}