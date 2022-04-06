import {springChain} from "./springChain";
import {vnew} from "../../utils/math/vector";
import { lerp } from "../../utils/math/number";
import {Graphics, Sprite} from "pixi.js";
import {sleep} from "../../cutscene/sleep";
import {rng} from "../../utils/rng";
import {container} from "../../utils/pixi/container";
import {merge} from "../../utils/merge";
import {BiguaTails} from "../../textures";

const v = vnew();

export function biguaTail(right = 1, base = 4, length = 40) {
    const count = 8;
    const chain = springChain(vnew(), count, length / count, [right, 0]);
    chain.nodes.forEach((x, i) => x.radius = lerp(base, 1, i / (count - 1)));

    function simulate() {
        chain.compute();

        chain.nodes.forEach((x, i) => {
            if (i === 0) {
                return;
            }
            x.vspeed += 0.4;
            v.at(x.hspeed, x.vspeed);
            v.vlength *= 0.85;
            // const l = v.vlength;
            // v.vlength -= l * l * 0.001;
            // speed -= speed*speed*0.001
            // v.vlength *= 0.9;
            x.hspeed = v.x;
            x.vspeed = v.y;
            // v.at(v2);
        });
        chain.apply();
    }

    function twitch() {
        const i = rng.int(chain.nodes.length);
        const n = chain.nodes[i || 1];
        let f = rng() > 0.9 ? 3 : 1;
        if (c.twitch)
            f *= 3;
        n.vspeed += rng.polar * f;
        n.hspeed += rng.polar * f;
    }

    const c = merge(container(), { color: 0, twitch: false } )
        .withAsync(async () => {
            while (true) {
                if (c.twitch)
                    await sleep(67);
                else
                    await sleep(500 + rng.int(500));
                twitch();
            }
        });

    const s = Sprite.from(BiguaTails).at(-24, -20);

    const g = new Graphics().at(-20, 0).withStep(() => {
        simulate();
        g.clear();
        g.beginFill(c.color);
        s.tint = c.color;
        for (let i = 0; i < chain.nodes.length - 2; i += 0.33) {
            const p = chain.nodes[Math.floor(i)];
            const n = chain.nodes[Math.ceil(i)];
            const f = i % 1;
            g.drawCircle(lerp(p.x, n.x, f), lerp(p.y, n.y, f), lerp(p.radius, n.radius, f));
        }
    });

    c.addChild(s, g);

    return c;
}