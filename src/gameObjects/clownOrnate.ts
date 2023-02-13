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
import {moveTowards, vnew} from "../utils/math/vector";
import {Sprite} from "pixi.js";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {flipH} from "../utils/pixi/flip";
import {animatedSprite} from "../igua/animatedSprite";
import {approachLinear, nclamp} from "../utils/math/number";
import {range} from "../utils/range";
import {scene} from "../igua/scene";
import {Blinking} from "../pixins/blinking";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {Hbox} from "./hbox";

export function clownOrnate() {
    const p = mkPuppet();
    const auto = mkAutomation(p);
    auto.head.facePlayer = true;
    auto.eyes.lookAtPlayer = true;
    auto.cheeks.alert = true;

    return p;
}

function mkPuppet() {
    const head = mkHead();
    const c = merge(container(head), { head });

    return c;
}

function mkAutomation(puppet: ReturnType<typeof mkPuppet>) {
    const f = {
        eyes: { closeLeft: false, closeRight: false, widen: false, lookAtPlayer: false },
        cheeks: { alert: false, },
        head: { facePlayer: false }
    };

    const c = container()
        .withPixin(Blinking({ blinkLerpMs: 150, blinkEyelidHoldMs: 110, blinkDelayBaseMs: 700 }))
        .withStep(() => {
            if (f.eyes.widen || f.eyes.closeLeft || f.eyes.closeRight)
                c.blinkOverride = 0;
            else
                c.blinkOverride = undefined;

            const b = f.eyes.widen ? 0 : c.blink;
            puppet.head.face.eyel.closedUnit = approachLinear(puppet.head.face.eyel.closedUnit, f.eyes.closeLeft ? 1 : b, 0.2);
            puppet.head.face.eyer.closedUnit = approachLinear(puppet.head.face.eyer.closedUnit, f.eyes.closeRight ? 1 : b, 0.2);

            if (f.eyes.lookAtPlayer) {
                const l = getWorldCenter(puppet.head.face.eyel.children[0]);
                v.at(nclamp((player.x - l.x) / 32, 4), nclamp((player.y - l.y) / 12, 8));
                moveTowards(puppet.head.face.eyel.look, v, 0.2);

                const r = getWorldCenter(puppet.head.face.eyer.children[0]);
                v.at(nclamp((player.x - r.x) / 32, 4), nclamp((player.y - r.y) / 12, 8));
                moveTowards(puppet.head.face.eyer.look, v, 0.2);
            }

            if (f.head.facePlayer) {
                const h = getWorldCenter(puppet.head.hurtbox);
                v.at(nclamp((player.x - h.x) / 128, 1), nclamp((player.y - h.y) / 32, 1));
                moveTowards(puppet.head.facingUnit, v, 0.1);
            }

            if (f.cheeks.alert) {
                if (scene.ticks % 30 === 0) {
                    puppet.head.face.cheekl.yellow = !puppet.head.face.cheekl.yellow;
                    puppet.head.face.cheekr.yellow = !puppet.head.face.cheekr.yellow;
                }
            }
            else {
                puppet.head.face.cheekl.yellow = false;
                puppet.head.face.cheekr.yellow = false;
            }
        })
        .show(puppet);

    return f;
}

const v = vnew();

function mkHead() {
    const face = mkFace();
    face.pivot.set(-12, 1);

    const hurtbox = new Hbox(2, -1, 45, 29);

    const c = merge(container(), { face, facingUnit: vnew(), hurtbox });

    const nogginFaceMask = Sprite.from(txs.faceShape).at(-2, -16);
    const nogginMask = Sprite.from(txs.noggin);
    const sideburns = Sprite.from(txs.sideburns);
    sideburns.pivot.set(8, -2);
    const noggin = Sprite.from(txs.noggin);
    const hair = mkHair();
    hair.pivot.set(8, 23)

    sideburns.filter(alphaMaskFilter(nogginMask));
    face.filter(alphaMaskFilter(nogginFaceMask));

    c.withStep(() => {
        sideburns.x = c.facingUnit.x * 8;
        face.at(c.facingUnit.x * 12, c.facingUnit.y).vround();
        hair.facingUnit.at(c.facingUnit);
    });

    c.addChild(nogginFaceMask, nogginMask, noggin, sideburns, hair, face, hurtbox);

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
            unit = approachLinear(unit, s.yellow ? 1 : 0, 0.1);
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
        pupil.at(c.look);
        pupil.x *= c.scale.x;
        eyelid.pivot.y = (1 - c.closedUnit) * 22;
        brow.pivot.set(-c.brow.offset.x, -c.brow.offset.y);
    });

    return c;
}

function mkHair() {
    const c = merge(container(), { facingUnit: vnew() });

    Sprite.from(txs.hair[0]).show(c);
    const blobs = range(5).map(i => Sprite.from(txs.hair[i + 1]).show(c));
    blobs[4].index = 1;

    return c.withStep(() => {
        const t = scene.s * 0.67;
        blobs[0].pivot.set(Math.sin(t * Math.PI * 2 + 1) * 1, Math.cos(t * Math.PI * 2 + 2) * 2);
        blobs[1].pivot.set(Math.sin(t * Math.PI * 1 + 2) * 2, Math.sin(t * Math.PI * 2 + 4) * 1);
        blobs[2].pivot.set(Math.cos(t * Math.PI * 2 + 3) * 1, Math.sin(t * Math.PI * 1 + 8) * 2);
        blobs[3].pivot.set(Math.cos(t * Math.PI * 3 + 4) * 1 - 2, Math.cos(t * Math.PI * 2 + 16) * 1);
        blobs[4].pivot.set(Math.cos(t * Math.PI * 2 + 5) * 1, Math.sin(t * Math.PI * 3 + 32) * 2);
        blobs[4].pivot.x += c.facingUnit.x * 5;
        if (c.facingUnit.y < 0)
            blobs[4].pivot.y += c.facingUnit.y * 3;
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