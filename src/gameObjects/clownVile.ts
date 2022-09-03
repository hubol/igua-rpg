import {Sprite} from "pixi.js";
import {
    VileClownEyebrow,
    VileClownEyelid,
    VileClownHair,
    VileClownHead,
    VileClownMouth,
    VileClownPupil
} from "../textures";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {flipH} from "../utils/pixi/flip";
import {now} from "../utils/now";

export function clownVile() {
    function newEye() {
        const eyebrow = Sprite.from(VileClownEyebrow);
        const eyelid = Sprite.from(eyelidTxs[0]);
        const pupil = Sprite.from(VileClownPupil);
        const c = merge(container(pupil, eyelid, eyebrow), { pupil, closed: 0.45, eyebrow })
            .withStep(() => {
                eyelid.texture = eyelidTxs[Math.floor(Math.max(0, Math.min(1, c.closed) * eyelidTxs.length))];
            });

        eyebrow.pivot.at(1, 7);
        pupil.pivot.at(-3, -3);
        c.pivot.at(0, -7);

        return c;
    }

    function newHead() {
        const mask = Sprite.from(VileClownHead);
        const sprite = Sprite.from(VileClownHead);
        const eyeL = newEye();
        const eyeR = newEye().at(15, 0);
        flipH(eyeR.eyebrow).pivot.x -= 1;
        const mouth = Sprite.from(mouthTxs[0]).at(-2, 18);
        const hair = newHair().at(-8, -14);
        const face = container(eyeL, eyeR, mouth).filter(alphaMaskFilter(mask)).at(18, 0);
        return container(mask, sprite, hair, face);
    }

    function newHair() {
        const sprites = hairTxs.map(Sprite.from);
        const c = merge(container(...sprites), { rate: 1 })
            .withStep(() => {
                const r = c.rate * Math.PI * 2;
                sprites[1].at(Math.sin(now.s * r + 1) + 1, Math.cos(now.s * r * 0.9 - 2) + 1).vround();
                sprites[2].at(Math.sin(now.s * r * 1.1 + 2) * 2, Math.sin(now.s * -r + 3) - 1).vround();
                sprites[3].at(Math.cos(now.s * -r * 0.8 + 5) * 2 + 2, Math.cos(now.s * r - 6) - 1).vround();
            });

        return c;
    }

    return newHead();
}

const eyelidTxs = subimageTextures(VileClownEyelid, 12);
const mouthTxs = subimageTextures(VileClownMouth, { width: 32 });
const hairTxs = subimageTextures(VileClownHair, 4);