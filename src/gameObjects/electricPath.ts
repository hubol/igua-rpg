import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {moveTowards, Vector, vnew} from "../utils/math/vector";
import {Graphics} from "pixi.js";
import {player} from "./player";

const r = 4;
const rh = r / 2;

const w1 = vnew();
const w2 = vnew();

export function electricPath(onPlayerCollides: () => void) {
    function mask() {
        return new Graphics()
            .beginFill(0xff0000)
            .drawRect(-rh, -rh, r, r)
            .show(masks);
    }

    function toImpl(x: number, y: number) {
        if (!masks.children[0])
            return mask().at(x, y);
        w1.at(masks.children[masks.children.length - 1]);
        w2.at(x, y);
        do {
            moveTowards(w1, w2, r * 2);
            mask().at(w1);
        }
        while (w1.x !== x && w1.y !== y);
    }

    let _isDying = false;

    const c = merge(container(), {
        to(v: Vector) {
            toImpl(v.x, v.y);
        },
        // toWorld(v: Vector) {
        //     toImpl(v.x - (c.worldTransform.tx + scene.camera.x), v.y - (c.worldTransform.ty + scene.camera.y));
        // },
        get isDying() {
            return _isDying;
        },
        die() {
            _isDying = true;
        }
    })
        .withStep(() => {
            if (_isDying) {
                if (masks.children.length <= 0)
                    return c.destroy();
                masks.children[0].destroy();
            }
            if (player.collides(masks.children))
                onPlayerCollides();
        });
    const masks = container().show(c);
    return c;
}