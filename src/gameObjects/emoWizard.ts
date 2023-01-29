import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {FinalEmoWizardBody, FinalEmoWizardDress, FinalEmoWizardDressFringe, FinalEmoWizardFace} from "../textures";
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
import {approachLinear, nlerp} from "../utils/math/number";
import {now} from "../utils/now";
import {trackPosition} from "../igua/trackPosition";
import {waitHold} from "../cutscene/waitHold";
import {show} from "../cutscene/dialog";
import { EmoWizardStep } from "../sounds";

const bodyTxs = subimageTextures(FinalEmoWizardBody, 6);
const dressTxs = subimageTextures(FinalEmoWizardDress, 6);

export function emoWizard() {
    let pedometer = 0;
    let crouch = 0;

    const c = merge(container(), { dress: dress(), head: head(), set facing(value: number) {
            c.dress.facing = value;
            c.head.facing = value;
            c.head.face.facing = value;
        },
        isCrouching: false,
        autoFacing: true,
        autoEmote: false,
        say(message: string, emotion: Emotion) {
            c.head.face.emotion = emotion;
            return show(message);
        }})
        .withStep(() => {
            c.head.y = c.dress.neckY;
            c.dress.walking = Math.abs(diff.x) > 0.3;

            if (c.dress.walking) {
                pedometer += nlerp(1, 2, (Math.abs(diff.x) - 1) / 6);
                const f = (Math.sin((pedometer / 10) * Math.PI) + 1) / 2;
                c.dress.crouchUnit = f * 0.4;
                if (c.autoFacing)
                    c.facing = Math.sign(diff.x);
            }
            else {
                pedometer = 0;
                c.dress.crouchUnit = approachLinear(c.dress.crouchUnit, crouch, 0.1);
            }

            crouch = approachLinear(crouch, c.isCrouching ? 1 : 0, 0.033);
        });

    const { diff } = trackPosition(c);

    c.addChild(c.dress, c.head);

    c.withAsync(async () => {
        while (true) {
            await waitHold(() => c.autoEmote, 50 + rng.int(70));
            c.head.face.emotion = rng.int(Emotion.Happy + 1);
        }
    });

    c.pivot.set(16, 36);
    return c;
}

export const emoWizardHead = head;

export enum Emotion {
    Angry,
    Shocked,
    Sad,
    Cool,
    Dead,
    Happy
}

function face() {
    const c = merge(container(), { emotion: Emotion.Angry, facing: 0 })
        .withStep(() => {
            c.pivot.x = approachLinear(c.pivot.x, -c.facing * 2, 0.25);
        })
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
                c.x = Math.sin(now.s * Math.PI * 4);
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
    const s = animatedSprite(dressTxs, 0).at(10, 20);
    const c = merge(container(), { facing: 0, get neckY() { return Math.floor(s.imageIndex); }, crouchUnit: 0, walking: false, });
    s.show(c);
    const fringe = Sprite.from(FinalEmoWizardDressFringe).at(16, 36).show(c);
    fringe.anchor.set(10 / 22, 0);
    const arms = Sprite.from(bodyTxs[4]).show(c);
    c.withStep(() => {
        arms.pivot.x = approachLinear(arms.pivot.x, c.facing, 0.25);
        arms.y = Math.sign(Math.round((Math.sin(scene.s * Math.PI * 1 + 1) + 1) / 2));
        s.imageIndex = Math.max(0, Math.min(dressTxs.length - 1, c.crouchUnit * dressTxs.length));
        arms.y += Math.floor(c.neckY / 2);
    })
    .withAsync(async () => {
        while (true) {
            await wait(() => c.neckY > 1);
            fringe.scale.x = 0.9;
            if (c.walking) {
                // @ts-ignore
                EmoWizardStep.volume(0.4).play();
            }
            await sleep(125);
            await wait(() => c.neckY < 1);
            fringe.scale.x = 1;
        }
    });
    return c;
}

function head() {
    const backHair = hair(bodyTxs[0], 12, 22);
    const noggin = Sprite.from(bodyTxs[1]);
    const myFace = face().at(6, 4);
    const earring = Sprite.from(bodyTxs[5]);
    const frontHair = hair(bodyTxs[3]);

    const c = merge(container(backHair, noggin, myFace, earring, frontHair), { facing: 0, face: myFace, away: false });

    c.withStep(() => {
        backHair.index = c.away ? 4 : 0;
        noggin.index = c.away ? 3 : 1;
        myFace.index = 2;
        myFace.visible = !c.away;
        frontHair.index = c.away ? 0 : 4;

        if (c.away) {
            earring.index = 3;
            earring.x = 20;
            earring.pivot.x = 0;
        }
        else {
            earring.index = c.facing < 0 && earring.pivot.x < -1 ? 1 : 3;
            earring.x = 0;
            earring.pivot.x = approachLinear(earring.pivot.x, Math.abs(c.facing) * -2, 0.25);
        }
    });

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
        const f = Math.sin(now.s * Math.PI * 0.25 + ystart * 19 + yend * 3);
        let seed = ystart * 1.2 - yend * 4;
        for (let i = 1; i < c.children.length; i++) {
            c.children[i].x = c.children[i - 1].x;
            c.children[i].x += Math.sin(now.s * Math.PI + seed) * f;
            seed += Math.pow(i, 2) * 0.05 + i * 2.2;
        }
    })

    return c;
}