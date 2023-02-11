import {
    OrnateClownBody,
    OrnateClownCheek,
    OrnateClownEye, OrnateClownEyebrow,
    OrnateClownHair,
    OrnateClownMouth, OrnateClownNeckbrace,
    OrnateClownNoggin,
    OrnateClownNose, OrnateClownShoe, OrnateClownSideburns
} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {vnew} from "../utils/math/vector";
import {Sprite} from "pixi.js";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {flipH} from "../utils/pixi/flip";

export function clownOrnate() {
    const p = mkPuppet();
    return p;
}

function mkPuppet() {
    const head = mkHead();
    const c = merge(container(head), { head });

    return c;
}

function mkHead() {
    const face = mkFace();

    const c = merge(container(face), { face });

    return c;
}

function mkFace() {
    const eyel = mkEye();
    const eyer = mkEye().at(12, 0);
    flipH(eyer as any);

    const c = merge(container(eyel, eyer), { eyel, eyer });

    return c;
}

enum EyeShape {
    Default,
    Cross
}

enum PupilShape {
    Default,
    Small
}

function mkEye() {
    const c = merge(container(),  { shape: EyeShape.Default, pupilShape: PupilShape.Default, look: vnew(), closedUnit: 0 });

    const shapeMask = Sprite.from(txs.eyeShape[0]);
    const shapeBackground = Sprite.from(txs.eyeShape[0]);
    const pupil = Sprite.from(txs.pupil[0]);
    const eyelid = Sprite.from(txs.eyelid);
    const maskable = container(pupil, eyelid).filter(alphaMaskFilter(shapeMask));
    const outline = Sprite.from(txs.eyeOutline[0]);

    c.addChild(shapeMask, shapeBackground, maskable, outline);

    c.withStep(() => {
        shapeMask.texture = txs.eyeShape[c.shape];
        shapeBackground.texture = shapeMask.texture;
        outline.texture = txs.eyeOutline[c.shape];
        pupil.texture = txs.pupil[c.pupilShape];
        eyelid.pivot.y = (1 - c.closedUnit) * 22;
    });

    return c;
}

function mkTxs() {
    const eyeTxs = subimageTextures(OrnateClownEye, { width: 12 });
    return {
        noggin: OrnateClownNoggin,
        cheek: subimageTextures(OrnateClownCheek, { width: 6 }),
        eyeOutline: [eyeTxs[0], eyeTxs[2]],
        eyeShape: [eyeTxs[1], eyeTxs[3]],
        pupil: [eyeTxs[5], eyeTxs[4]],
        eyelid: eyeTxs[6],
        mouth: subimageTextures(OrnateClownMouth, { width: 22 }),
        nose: subimageTextures(OrnateClownNose, { width: 14 }),
        hair: subimageTextures(OrnateClownHair, { width: 64 }),
        eyebrow: subimageTextures(OrnateClownEyebrow, { width: 16 }),
        sideburns: OrnateClownSideburns,
        shoe: OrnateClownShoe,
        neckbrace: OrnateClownNeckbrace,
        body: subimageTextures(OrnateClownBody, { width: 38 }),
    };
}

const txs = mkTxs();