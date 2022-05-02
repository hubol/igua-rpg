import {container} from "../utils/pixi/container";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {
    UnorthodoxClownEye,
    UnorthodoxClownEyebrow, UnorthodoxClownFace,
    UnorthodoxClownHair,
    UnorthodoxClownHead,
    UnorthodoxClownMouth
} from "../textures";
import {Graphics, Sprite} from "pixi.js";
import {now} from "../utils/now";
import {merge} from "../utils/merge";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/rng";
import {approachLinear} from "../utils/math/number";

const hairTextures = subimageTextures(UnorthodoxClownHair, 3);
const mouthTxs = subimageTextures(UnorthodoxClownMouth, 4);
const eyeTxs = subimageTextures(UnorthodoxClownEye, 3);

export function clownUnorthodox() {
    const controls = {
        face: {
            unit: 0,
        },
        eyes: {
            closedUnit: 0,
            closing: false,
            forceWide: true,
        },
        brows: {
            angry: true
        },
        mouth: {
            excited: false,
            big: false,
        }
    }

    function hair() {
        const wigglies = [hairTextures[1], hairTextures[2]].map((x, i) => {
            const s = Sprite.from(x);
            s.y = 16;
            s.anchor.y = s.y / 30;
            s.withStep(() => {
                s.scale.y = 1 + (1 + Math.sin(now.s * Math.PI * 1 + i)) * 0.125;
                s.height = Math.round(s.height / 2) * 2;
            });
            return s;
        })
        const c = container(Sprite.from(hairTextures[0]), ...wigglies);
        c.pivot.set(1, 1);
        return c;
    }

    function eyebrow() {
        const s = Sprite.from(UnorthodoxClownEyebrow)
            .withStep(() => {
                s.angle = (controls.brows.angry ? 40 : 0) * Math.sign(s.scale.x);
                s.y = controls.brows.angry ? ((now.s * 4) % 1) : 0;
            });
        s.anchor.set(6/14, 2/8);
        return s;
    }

    function newMouth() {
        const subimages = [1, 0, 1, 2, 3, 2];
        let index = 0;

        const s = Sprite.from(mouthTxs[2])
            .withStep(() => {
                let i = controls.mouth.excited ? subimages[Math.floor(index) % subimages.length] : 2;
                if (controls.mouth.big)
                    i = 3;
                s.texture = mouthTxs[i];
                if (controls.mouth.excited)
                    index += 0.2;
            });
        return s;
    }

    function newEye() {
        const eye = container();

        const pupil = Sprite.from(eyeTxs[1]);
        const pupilmask = Sprite.from(eyeTxs[0]);
        pupil.mask = pupilmask;
        container(pupilmask, pupil).show(eye);

        const lids = new Graphics()
            .withStep(() => {
                lids.clear();

                const y = Math.round(7 * controls.eyes.closedUnit) + 6;
                if (controls.eyes.forceWide)
                    return;
                lids
                    .beginFill(0xffffff)
                    .drawRect(1, 0, 13, y)
                    .endFill()
                    .lineStyle(1, 0x0D1C7C)
                    .moveTo(1, y)
                    .lineTo(13, y);
            })
            .show(eye);

        Sprite.from(eyeTxs[2]).show(eye);

        return eye;
    }

    function newHead() {
        const bald = Sprite.from(UnorthodoxClownHead);
        bald.pivot.set(-11, -16);
        bald.mask = Sprite.from(UnorthodoxClownHead).show(bald);

        const eyeL = newEye();
        const eyeR = newEye();
        const cer = container(eyeR).at(15, 0);
        const eyes = container(eyeL, cer).at(23, 6).show(bald);

        const mouth = newMouth().at(29, 24).show(bald);

        const features = Sprite.from(UnorthodoxClownFace).at(8, 19).show(bald);

        const browL = eyebrow();
        const browR = eyebrow();
        browR.scale.x = -1;
        const cbr = container(browR).at(15, 0);

        const brows = container(browL, cbr).at(41, 18);

        const c = container(bald, hair(), brows);

        return merge(c, { mouth });
    }

    const head = newHead();

    head
        .withStep(() => {
            controls.eyes.closedUnit = approachLinear(controls.eyes.closedUnit, controls.eyes.closing ? 1 : 0, 0.1);
        })
        .withAsync(async () => {
            while (true) {
                await sleep(2000);
                controls.mouth.excited = true;
                await sleep(2000);
                controls.mouth.excited = false;
                controls.mouth.big = true;
                await sleep(2000);
                controls.mouth.big = false;
            }
        })
        .withAsync(async () => {
            while (true) {
                await sleep(500 + rng.int(2500));
                controls.eyes.closing = true;
                await sleep(220);
                controls.eyes.closing = false;
                await sleep(200);
            }
        })

    return head;
}