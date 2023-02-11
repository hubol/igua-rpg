import {
    OrnateClownBody,
    OrnateClownCheek,
    OrnateClownEye, OrnateClownEyebrow,
    OrnateClownHair,
    OrnateClownMouth, OrnateClownNeckbrace,
    OrnateClownNoggin, OrnateClownNogginFaceMask,
    OrnateClownNose, OrnateClownShoe, OrnateClownSideburns
} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {vnew} from "../utils/math/vector";
import {Sprite} from "pixi.js";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {flipH} from "../utils/pixi/flip";
import {animatedSprite} from "../igua/animatedSprite";
import {approachLinear} from "../utils/math/number";
import {range} from "../utils/range";
import {scene} from "../igua/scene";

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
    face.pivot.set(-12, 1);

    const c = merge(container(), { face });

    const nogginFaceMask = Sprite.from(txs.faceShape).at(-2, -16);
    const nogginMask = Sprite.from(txs.noggin);
    const sideburns = Sprite.from(txs.sideburns);
    sideburns.pivot.set(8, -6);
    const noggin = Sprite.from(txs.noggin);
    const hair = mkHair();
    hair.pivot.set(8, 23)

    sideburns.filter(alphaMaskFilter(nogginMask));
    face.filter(alphaMaskFilter(nogginFaceMask));

    c.addChild(nogginFaceMask, nogginMask, noggin, sideburns, hair, face);

    return c;
}

function mkFace() {
    const eyel = mkEye();
    const eyer = mkEye().at(14, 0);

    const nose = animatedSprite(txs.nose, 0).at(5, 14);

    const mouth = mkMouth().at(1, 23);

    const cheekl = mkCheek().at(-4, 22);
    const cheekr = mkCheek(true).at(23, 22);

    flipH(eyer as any);

    const c = merge(container(eyel, eyer, mouth, nose, cheekl, cheekr), { eyel, eyer, mouth, nose, cheekl, cheekr });

    return c;
}

function mkCheek(yellow = false) {
    let unit = yellow ? 1 : 0;
    const s = merge(animatedSprite(txs.cheek, 0), { yellow })
        .withStep(() => {
            unit = approachLinear(unit, yellow ? 1 : 0, 0.05);
            s.imageIndex = unit * 2;
        });

    return s;
}

enum MouthShape {
    SmileSmall,
    Smile,
    OpenSmall,
    Open,
    OpenWide,
    OpenFrown,
}

function mkMouth() {
    const s = animatedSprite(txs.mouth, 0);
    s.imageIndex = MouthShape.Smile;

    return s as Sprite & { imageIndex: MouthShape };
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
    const c = merge(container(),  { shape: EyeShape.Default, pupilShape: PupilShape.Default, look: vnew(), closedUnit: 0, brow: { offset: vnew() } });

    const shapeMask = Sprite.from(txs.eyeShape[0]);
    const shapeBackground = Sprite.from(txs.eyeShape[0]);
    const pupil = Sprite.from(txs.pupil[0]);
    const eyelid = Sprite.from(txs.eyelid);
    const maskable = container(pupil, eyelid).filter(alphaMaskFilter(shapeMask));
    const outline = Sprite.from(txs.eyeOutline[0]);

    const brow = animatedSprite(txs.eyebrow, 0).at(13, -7);
    brow.scale.x = -1;

    c.addChild(shapeMask, shapeBackground, maskable, outline, brow);

    c.withStep(() => {
        shapeMask.texture = txs.eyeShape[c.shape];
        shapeBackground.texture = shapeMask.texture;
        outline.texture = txs.eyeOutline[c.shape];
        pupil.texture = txs.pupil[c.pupilShape];
        eyelid.pivot.y = (1 - c.closedUnit) * 22;
        brow.pivot.set(-c.brow.offset.x, -c.brow.offset.y);
    });

    return c;
}

function mkHair() {
    const c = container();

    Sprite.from(txs.hair[0]).show(c);
    const blobs = range(5).map(i => Sprite.from(txs.hair[i + 1]).show(c));

    return c.withStep(() => {
        const t = scene.s * 0.67;
        blobs[0].pivot.set(Math.sin(t * Math.PI * 2 + 1) * 1, Math.cos(t * Math.PI * 2 + 2) * 2);
        blobs[1].pivot.set(Math.sin(t * Math.PI * 1 + 2) * 2, Math.sin(t * Math.PI * 2 + 4) * 1);
        blobs[2].pivot.set(Math.cos(t * Math.PI * 2 + 3) * 1, Math.sin(t * Math.PI * 1 + 8) * 2);
        blobs[3].pivot.set(Math.cos(t * Math.PI * 3 + 4) * 1 - 2, Math.cos(t * Math.PI * 2 + 16) * 1);
        blobs[4].pivot.set(Math.cos(t * Math.PI * 2 + 5) * 1, Math.sin(t * Math.PI * 3 + 32) * 2);
    });
}

function mkTxs() {
    const eyeTxs = subimageTextures(OrnateClownEye, { width: 12 });
    return {
        noggin: OrnateClownNoggin,
        faceShape: OrnateClownNogginFaceMask,
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