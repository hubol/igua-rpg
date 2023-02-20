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
import {flipH} from "../utils/pixi/flip";
import {animatedSprite} from "../igua/animatedSprite";
import {approachLinear, nclamp} from "../utils/math/number";
import {range} from "../utils/range";
import {scene} from "../igua/scene";
import {Blinking} from "../pixins/blinking";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {Hbox} from "./hbox";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {sleep} from "../cutscene/sleep";
import {lerp} from "../cutscene/lerp";

export function clownOrnate() {
    const p = mkPuppet();
    const auto = mkAutomation(p);
    auto.head.facePlayer = true;
    auto.eyes.lookAt = "player";
    auto.cheeks.alert = true;
    auto.body.facePlayer = true;

    p.withAsync(async () => {
        while (true) {
            await lerp(p.body.neck, 'extendingUnit').to(0).over(250);
            await sleep(1000);
            await lerp(p.body.neck, 'extendingUnit').to(1).over(250);
            await sleep(1000);
        }
    })
        .withAsync(async () => {
            await sleep(500);
            while (true) {
                await lerp(p.body, 'crouchingUnit').to(1).over(250);
                await sleep(2000);
                await lerp(p.body, 'crouchingUnit').to(0).over(250);
                await sleep(2000);
            }
        })
        .withAsync(async () => {
            await sleep(750);
            while (true) {
                auto.eyes.lookAt = 'deadpan';
                auto.neck.wiggle = true;
                p.head.face.eyel.twitchOn = true;
                p.head.face.eyer.twitchOn = true;
                await sleep(1500);
                auto.eyes.lookAt = 'player';
                auto.neck.wiggle = false;
                p.head.face.eyel.twitchOn = false;
                p.head.face.eyer.twitchOn = false;
                await sleep(1500);
            }
        })

    return p;
}

function mkPuppet() {
    const head = mkHead();
    const body = mkBody(head);
    const c = merge(container(body, head), { body, head });
    c.pivot.set(24, 64);

    return c;
}

function mkBody(head: ReturnType<typeof mkHead>) {
    const hurtbox = new Hbox(2, 3, 33, 13);

    const c = merge(container(), { torso: { facingUnit: 0 }, neck: { extendingUnit: 1, wigglingUnit: 0 }, crouchingUnit: 0, hurtbox });

    const neckbraceShadow = Sprite.from(txs.neckbrace[2]);

    const torsoSprite = Sprite.from(txs.body[0]);
    const torsoButtonsSprite = Sprite.from(txs.body[1]);
    const torsoShadedSprite = Sprite.from(txs.body[2]);
    torsoShadedSprite.mask = neckbraceShadow;
    const torso = container(torsoSprite, torsoShadedSprite, torsoButtonsSprite, hurtbox);
    torso.pivot.set(-6, -39);

    const neckbrace = container(neckbraceShadow);
    const neckbraceShapeSprite = Sprite.from(txs.neckbrace[0]).show(neckbrace);
    Sprite.from(txs.neckbrace[0]).show(neckbrace);
    const neckbraceOverlapSprite = Sprite.from(txs.neckbrace[1]).show(neckbrace).filter(alphaMaskFilter(neckbraceShapeSprite));

    neckbrace.pivot.set(-7, -26);

    const shoeL = Sprite.from(txs.shoe);
    const shoeR = Sprite.from(txs.shoe);
    shoeR.scale.x = -1;

    shoeL.pivot.set(-5, -50);
    shoeR.pivot.set(44, -50);

    const upperBody = container(torso, neckbrace);

    c.withStep(() => {
        torsoButtonsSprite.x = c.torso.facingUnit * 12;
        torsoButtonsSprite.y = Math.abs(c.torso.facingUnit) * -1;
        torsoButtonsSprite.vround();
        neckbraceOverlapSprite.x = Math.round(c.torso.facingUnit * (c.torso.facingUnit >= 0 ? 4 : 12));
        neckbraceShadow.pivot.y = c.neck.extendingUnit > 0.25 ? 0 : 1;
        neckbrace.y = Math.round((1 - c.neck.extendingUnit) * 4);
        upperBody.y = Math.round(c.crouchingUnit * 6);

        head.y = Math.round(neckbrace.y * 1.5) + upperBody.y;
        neckbrace.x = Math.round(Math.sin(scene.s * Math.PI * 5) * c.neck.wigglingUnit * 2);
        head.x = Math.round(Math.sin((scene.s - 0.25) * Math.PI * 5) * c.neck.wigglingUnit * 3);
    });

    c.addChild(shoeL, shoeR, upperBody);

    return c;
}

type LookAt = 'player' | 'deadpan' | 'off';

function mkAutomation(puppet: ReturnType<typeof mkPuppet>) {
    const f = {
        eyes: { closeLeft: false, closeRight: false, widen: false, lookAt: <LookAt>'player' },
        cheeks: { alert: false, },
        head: { facePlayer: false },
        body: { facePlayer: false, },
        neck: { wiggle: false, },
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

            puppet.body.neck.wigglingUnit = approachLinear(puppet.body.neck.wigglingUnit, f.neck.wiggle ? 1 : 0, 0.3);

            if (f.eyes.lookAt === 'deadpan') {
                v.at(0, 0);
                moveTowards(puppet.head.face.eyel.look, v, 0.2);
                moveTowards(puppet.head.face.eyer.look, v, 0.2);
            }
            else if (f.eyes.lookAt === 'player') {
                const l = getWorldCenter(puppet.head.face.eyel.children[0]);
                v.at(nclamp((player.x - l.x) / 32, 4), nclamp((player.y - l.y) / 12, 8));
                moveTowards(puppet.head.face.eyel.look, v, 0.2);

                const r = getWorldCenter(puppet.head.face.eyer.children[0]);
                v.at(nclamp((player.x - r.x) / 32, 4), nclamp((player.y - r.y) / 12, 8));
                moveTowards(puppet.head.face.eyer.look, v, 0.2);
            }

            const h = getWorldCenter(puppet.head.hurtbox);

            if (f.head.facePlayer) {
                v.at(nclamp((player.x - h.x) / 128, 1), nclamp((player.y - h.y) / 32, 1));
                moveTowards(puppet.head.facingUnit, v, 0.1);
            }

            if (f.body.facePlayer) {
                puppet.body.torso.facingUnit = approachLinear(puppet.body.torso.facingUnit, nclamp((player.x - h.x) / 128, 1), 0.0175)
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

    sideburns.mask = nogginMask;
    face.mask = nogginFaceMask;

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
    let twitchOn = false;
    let twitchSteps = 0;

    const c = merge(container(),  {
        shape: EyeShape.Default, pupilShape: PupilShape.Default, look: vnew(), closedUnit: 0, brow: { offset: vnew() },
        get twitchOn() {
            return twitchOn;
        },
        set twitchOn(value) {
            twitchOn = value;
            twitchSteps = c.scale.x > 0 ? 0 : 30;
            if (!value)
                c.pupilShape = PupilShape.Default;
        }
    });

    const shapeMask = Sprite.from(txs.eyeShape[0]);
    const shapeBackground = Sprite.from(txs.eyeShape[0]);
    const pupil = Sprite.from(txs.pupil[0]);
    const eyelid = Sprite.from(txs.eyelid);
    const maskable = container(pupil, eyelid);
    maskable.mask = shapeMask;
    const outline = Sprite.from(txs.eyeOutline[0]);

    const brow = animatedSprite(txs.eyebrow, 0).at(13, -7);
    brow.scale.x = -1;

    c.addChild(shapeMask, shapeBackground, maskable, outline, brow);

    c.withStep(() => {
        if (twitchOn) {
            c.pupilShape = twitchSteps > 30 ? PupilShape.Small : PupilShape.Default;
            twitchSteps = (twitchSteps + 3) % 60;
        }

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
        neckbrace: subimageTextures(OrnateClownNeckbrace, { width: 32 }),
        body: subimageTextures(OrnateClownBody, { width: 38 }),
    };
}

const txs = mkTxs();