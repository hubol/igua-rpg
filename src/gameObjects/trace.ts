import {distance, Vector} from "../utils/math/vector";
import {Graphics} from "pixi.js";
import {container} from "../utils/pixi/container";
import {player} from "./player";

export function trace(v: Vector[]) {
    if (v.length < 2)
        throw new Error(`Invalid path for trace: ${v}`);

    const g = new Graphics();
    g.lineStyle(2);
    g.moveTo(v[0].x, v[0].y);
    for (let i = 0; i < v.length; i++)
        g.lineTo(v[i].x, v[i].y);

    const mask = new Graphics().drawRect(0, 0, 1, 1).hide();

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

    const pen = new Graphics()
        .withStep(() => {
            while (!state.winner && mask.collides(player)) {
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

            pen.lineTo(mask.x, mask.y);
            pen
                .beginFill(pen.line.color)
                .drawCircle(mask.x, mask.y, 2);
        });

    return container(g, pen, mask);
}
