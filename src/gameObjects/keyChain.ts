import {Graphics, Sprite} from "pixi.js";
import {KeyBlue, KeyBlueMini} from "../textures";
import {container} from "../utils/pixi/container";
import {vnew} from "../utils/math/vector";
import {getWorldPos} from "../igua/gameplay/getCenter";
import {progress} from "../igua/data/progress";
import {sleep} from "../cutscene/sleep";
import {freezeSceneAndShowMessage} from "../cutscene/freezeSceneAndShowMessage";

export function keyChain() {
    const s = Sprite.from(KeyBlueMini);
    s.anchor.set(1 / 4, 1 / 8);

    const g0 = new Graphics();
    const g1 = new Graphics();
    const gs = [g0, g1];

    const prev = vnew();
    const diff = vnew();

    const c = container(g0, s, g1)
        .withStep(() => {
            if (prev.x !== 0 || prev.y !== 0) {
                diff.at(getWorldPos(c.parent)).add(prev, -1).scale(-2);
                s.moveTowards(diff, diff.vlength > 0 ? 0.5 : 0.05);
            }

            for (let i = 0; i < 2; i++) {
                const g = gs[i];
                const cpy = i - 1;
                g.clear().lineStyle(1, i === 0 ? 0xb0b0b0 : 0xd0d0d0)
                    .moveTo(-4, -4)
                    .quadraticCurveTo(-2, cpy * 4, s.x, s.y);
            }

            prev.at(getWorldPos(c.parent));
        })
        .on('removed', () => {
            const key = Sprite.from(KeyBlue)
                .centerAnchor()
                .at([0, -16].add(prev))
                .asCollectible(progress.flags.capital.key, 'fromClown', () => freezeSceneAndShowMessage('Found temple key.'))
                .withAsync(async () => {
                    await sleep(100);
                    key.ext.collectible = true;
                })
                .show();
            key.ext.collectible = false;
        });
    return c;
}