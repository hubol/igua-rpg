import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {FinalEmoClock} from "../textures";
import {container} from "../utils/pixi/container";
import {Sprite} from "pixi.js";
import {now} from "../utils/now";
import {sleep} from "../cutscene/sleep";

const txs = subimageTextures(FinalEmoClock, 3);

export function emoClock() {
    const c = container()
        .withAsync(async () => {
            while (true) {
                const n = now.date;
                const h = n.getHours() % 12;
                const m = n.getMinutes();
                const s = n.getSeconds();

                const hu = (h + m / 60) / 12;
                const mu = (m + s / 60) / 60;

                sprites[1].angle = mu * 360;
                sprites[1].anchor.set(sprites[1].angle < 180 ? (15 / 32) : (16 / 32))
                sprites[2].angle = hu * 360;
                await sleep(500);
            }
        });
    const sprites = txs.map(x => {
        const s = Sprite.from(x).show(c);
        s.anchor.set(15 / 32);
        return s;
    });
    return c;
}