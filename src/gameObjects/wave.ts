import {Graphics} from "pixi.js";
import { lerp as nlerp } from "../utils/math/number";
import {player} from "./player";
import {container} from "../utils/pixi/container";
import {sleep} from "../cutscene/sleep";
import {wait} from "../cutscene/wait";

export type WaveArgs = {
    life: number;
    damage: number;
    w1: number;
    h1: number;
    w2: number;
    h2: number;
    count: number;
    dx: number;
    ms: number;
}

export function wave(args: WaveArgs, onDamage?: () => void) {
    const _onDamage = () => {
        onDamage?.();
        player.damage(args.damage);
    }

    let i = 0;
    const c = container()
        .withAsync(async () => {
            let x = 0;
            while (i < args.count) {
                const f = i / (args.count - 1);
                const ww = Math.round(nlerp(args.w1, args.w2, f));
                const hh = Math.round(nlerp(args.h1, args.h2, f));
                waveSegment(ww, hh, args.life, _onDamage).show(c).at(x, 0);
                x += args.dx + Math.sign(args.dx) * Math.abs(ww);
                i++;
                await sleep(args.ms);
            }
            await wait(() => c.children.every(x => x.destroyed));
            c.destroy();
        })

    return c;
}

function waveSegment(width: number, height: number, life: number, onDamage: () => void) {
    const ilife = life;
    const m = new Graphics().beginFill(0).drawRect(-width / 2, -height, width, height);
    const g = new Graphics()
        .withStep(() => {
            if (life-- <= 0)
                return g.destroy();
            g.clear().beginFill(0xffffff).drawEllipse(0, 0, width / 2, height / 2);
            const f = 1 - (life / ilife);
            g.scale.y = nlerp(0.3, 1, f);
            const a = Math.min(1, Math.sin(f * Math.PI) * 1.5);
            g.alpha = Math.round(a * 4) / 4;

            if (g.alpha > 0.5 && g.collides(player) && m.collides(player))
                onDamage();
        })
    g.mask = m.show(g);
    return g;
}