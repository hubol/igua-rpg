import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {FinalEmoWizardBody, FinalEmoWizardFace} from "../textures";
import {DisplayObject, Sprite, Texture, TilingSprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {scene} from "../igua/scene";
import {animatedSprite} from "../igua/animatedSprite";
import {range} from "../utils/range";
import {wait} from "../cutscene/wait";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";
import {lerp} from "../cutscene/lerp";
import {merge} from "../utils/object/merge";
import {Undefined} from "../utils/types/undefined";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {dither} from "./dither";

const bodyTxs = subimageTextures(FinalEmoWizardBody, 6);

export function emoWizard() {
    const c = container(dress(), head());
    c.pivot.set(16, 36);
    return c;
}

enum Emotion {
    Angry,
    Shocked,
    Sad,
    Cool,
    Dead,
    Happy
}

function face() {
    const c = merge(container(), { emotion: Emotion.Angry })
        .withAsync(async () => {
            const d = dither();
            d.unit = 0.5;
            const filter1 = alphaMaskFilter(d);
            const filter2 = alphaMaskFilter(d);
            filter2.maskMatrix.tx = 1;

            let prev = Undefined<Emotion>();
            while (true) {
                await wait(() => prev !== c.emotion);
                prev = c.emotion;
                const current: DisplayObject | undefined = c.children.last;
                const next = emotions[c.emotion]().show(c);
                next.filter(filter1);
                current?.filter(filter2);
                await sleep(125);
                current?.destroy();
                next.filters = [];
            }
        });
    return c;
}

const faceTxs = subimageTextures(FinalEmoWizardFace, { width: 22 });

const emotions: Record<Emotion, () => DisplayObject> = {
    [Emotion.Angry]: () => animatedSprite([faceTxs[0], faceTxs[1]], 0.05),
    [Emotion.Shocked]: () => {
        const c = animatedSprite([faceTxs[3], faceTxs[2], faceTxs[4], faceTxs[2]], 0.125)
            .withStep(() => {
                c.x = Math.sin(scene.s * Math.PI * 4);
            });
        return c;
    },
    [Emotion.Sad]: () => animatedSprite([faceTxs[5], faceTxs[6]], 0.025),
    [Emotion.Cool]: () => {
        const c = animatedSprite(range(10).map(x => faceTxs[x + 7]), 0.2)
            .withAsync(async () => {
                while (true) {
                    await wait(() => c.imageIndex < 0.5 && c.imageSpeed > 0);
                    c.imageSpeed = 0;
                    await sleep(500 + rng.int(1000));
                    c.imageSpeed = 0.2;
                    c.imageIndex = 1;
                }
            });
        return c;
    },
    [Emotion.Dead]: () => {
        const c = animatedSprite([faceTxs[17], faceTxs[18], faceTxs[19], faceTxs[20]], 0)
            .withAsync(async () => await randomizedPingPongAnimation(c, 3));
        return c;
    },
    [Emotion.Happy]: () => {
        const c = animatedSprite([faceTxs[21], faceTxs[22], faceTxs[23]], 0)
            .withAsync(async () => await randomizedPingPongAnimation(c, 2));
        return c;
    }
}

async function randomizedPingPongAnimation(c: ReturnType<typeof animatedSprite>, max: number) {
    while (true) {
        await lerp(c, 'imageIndex').to(max).over(200 + rng.int(200));
        await sleep(500 + rng.int(500));
        await lerp(c, 'imageIndex').to(0).over(200 + rng.int(200));
        await sleep(500 + rng.int(500));
    }
}

function dress() {
    const c = container();
    const s = Sprite.from(bodyTxs[2]).show(c).at(16, 36);
    s.anchor.set(0.5, 1);
    const arms = Sprite.from(bodyTxs[4]).show(c);
    c.withStep(() => {
        arms.y = Math.sign(Math.round((Math.sin(scene.s * Math.PI * 1 + 1) + 1) / 2));
    });
    return c;
}

function head() {
    const c = container();
    hair(bodyTxs[0], 12, 22).show(c);
    Sprite.from(bodyTxs[1]).show(c);
    const f = face().at(6, 4).show(c);
    f.withAsync(async () => {
        while (true) {
            await sleep(500 + rng.int(3500));
            f.emotion = rng.int(Emotion.Happy + 1);
        }
    });
    Sprite.from(bodyTxs[5]).show(c);
    hair(bodyTxs[3]).show(c);
    return c;
}

function hair(tx: Texture, ystart = 6, yend = 16) {
    const c = container();

    let y0 = 0;
    for (let y1 = ystart; y1 < yend; y1 += 1) {
        const t = new TilingSprite(tx).show(c);
        t.y = y0;
        t.tileTransform.position.y = -y0;
        t.width = tx.width;
        t.height = y1 - y0;
        y0 = y1;
    }

    c.withStep(() => {
        const f = Math.sin(scene.s * Math.PI * 0.25 + ystart * 19 + yend * 3);
        let seed = ystart * 1.2 - yend * 4;
        for (let i = 1; i < c.children.length; i++) {
            c.children[i].x = c.children[i - 1].x;
            c.children[i].x += Math.sin(scene.s * Math.PI + seed) * f;
            seed += Math.pow(i, 2) * 0.05 + i * 2.2;
        }
    })

    return c;
}