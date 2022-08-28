import {distance, Vector, vnew} from "../utils/math/vector";
import {Graphics} from "pixi.js";
import {container} from "../utils/pixi/container";
import {player} from "./player";
import {PenDraw} from "../sounds";
import {rng} from "../utils/math/rng";
import {merge} from "../utils/object/merge";

export function trace(v: Vector[]) {
    if (v.length < 2)
        throw new Error(`Invalid path for trace: ${v}`);

    const g = new Graphics();
    g.lineStyle(2);
    g.moveTo(v[0].x, v[0].y);
    for (let i = 0; i < v.length; i++)
        g.lineTo(v[i].x, v[i].y);

    const mask = new Graphics().drawRect(-1, -1, 2, 2).hide();

    const state = {
        index: 0,
        get target() {
            return v[state.index + 1] ?? v[v.length - 1];
        },
        get winner() {
            return state.index >= v.length;
        }
    };
    mask.at(v[state.index]);

    const speed = vnew();

    const pen = new Graphics()
        .withStep(() => {
            let count = 0;
            const max = Math.max(4, Math.ceil(speed.at(player.hspeed, player.vspeed).vlength));
            while (!state.winner && mask.collides(player) && count++ < max) {
                if (count === 1) {
                    // @ts-ignore
                    PenDraw.volume(0.2).rate(0.5 + rng() * 1.5).play();
                }
                mask.moveTowards(state.target, 1);
                if (distance(mask, state.target) < 3) {
                    mask.at(state.target);
                    state.index += 1;
                }
            }

            pen
                .clear()
                .lineStyle(2, 0xcc0000)
                .moveTo(v[0].x, v[0].y);

            for (let i = 0; i < Math.min(state.index, v.length - 1); i++) {
                pen.lineTo(v[i + 1].x, v[i + 1].y);
            }

            pen
                .lineTo(mask.x, mask.y)
                .beginFill(pen.line.color);
            if (!state.winner)
                pen.drawCircle(Math.round(mask.x), Math.round(mask.y), 2);
        });

    return merge(container(g, pen, mask), { get winner() { return state.winner; } });
}
