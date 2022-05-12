import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {moveTowards, Vector, vnew} from "../utils/math/vector";
import {Graphics} from "pixi.js";
import {player} from "./player";
import {now} from "../utils/now";

const r = 4;
const rh = r / 2;

const w1 = vnew();
const w2 = vnew();

export function electricPath(onPlayerCollides: () => void, dieRate = 1) {
    function mask() {
        return new Graphics()
            .beginFill(0xff0000)
            .drawRect(-rh, -rh, r, r)
            .show(masks);
    }

    function toImpl(x: number, y: number) {
        if (!hits[0])
            return mask().at(x, y);
        w1.at(hits[hits.length - 1]);
        w2.at(x, y);
        do {
            moveTowards(w1, w2, r * 2);
            mask().at(w1);
        }
        while (w1.x !== x && w1.y !== y);
    }

    let _isDying = false;

    const colors = [0x50B0F0, 0xF8D048];
    const colors2 = [...colors].reverse();

    const c = merge(container(), {
        to(v: Vector) {
            toImpl(v.x, v.y);
        },
        get isDying() {
            return _isDying;
        },
        die() {
            _isDying = true;
        }
    })
        .withStep(() => {
            if (_isDying) {
                for (let i = 0; i < dieRate; i++) {
                    if (hits.length <= 0)
                        return c.destroy();
                    hits[0].destroy();
                }
            }
            if (player.collides(hits))
                onPlayerCollides();
            gfx.clear();
            if (hits.length <= 0)
                return;
            w1.at(hits[hits.length - 1]);
            const cc = now.s % 0.66 < 0.33 ? colors : colors2;
            for (let c = 0; c < cc.length; c++) {
                gfx
                    .lineStyle(1, cc[c])
                    .moveTo(w1.x, w1.y);

                const n = (now.s / 8) + 1 + c * 0.69;

                for (let i = hits.length - 2; i >= 0; i--) {
                    const h = hits[i];
                    gfx.lineTo(h.x + pseudo(h.x, h.y, n), h.y + pseudo(-h.y, h.x, n));
                    w2.at(h);
                }
            }

            gfx.beginFill(0xffffff)
                .drawCircle(w1.x, w1.y, Math.min(4, hits.length));
        });
    const masks = container().show(c).hide();
    const hits = masks.children;
    const gfx = new Graphics().show(c);
    return c;
}

function pseudo(x: number, y: number, z: number) {
    return -1 + Math.abs((x + 121.3631 + z) * 3 - (y - 32.479 - z * 2) * 4 + (z - 16.79) * 5) % 2;
}