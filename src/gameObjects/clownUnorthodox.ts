import {container} from "../utils/pixi/container";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {
    UnorthodoxClownEye,
    UnorthodoxClownEyebrow,
    UnorthodoxClownFace,
    UnorthodoxClownFoot,
    UnorthodoxClownHair,
    UnorthodoxClownHead,
    UnorthodoxClownJoint,
    UnorthodoxClownLegsSplit,
    UnorthodoxClownMouth
} from "../textures";
import {Graphics, Sprite} from "pixi.js";
import {now} from "../utils/now";
import {merge} from "../utils/object/merge";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";
import {approachLinear, lerp as nlerp} from "../utils/math/number";
import {moveTowards, Vector, vnew} from "../utils/math/vector";
import {player} from "./player";
import {rectangleDistance} from "../utils/math/rectangleDistance";
import {clownHealth} from "./utils/clownUtils";
import {bouncePlayerOffDisplayObject} from "../igua/bouncePlayer";
import {ClownHurt} from "../sounds";
import {lerp} from "../cutscene/lerp";
import {wait} from "../cutscene/wait";
import {newGravity} from "./utils/newGravity";
import {Undefined} from "../utils/types/undefined";
import {AoeHitboxes} from "./utils/aoeHitboxes";
import {scene} from "../igua/scene";
import {wave} from "./wave";

const hairTextures = subimageTextures(UnorthodoxClownHair, 3);
const mouthTxs = subimageTextures(UnorthodoxClownMouth, 4);
const eyeTxs = subimageTextures(UnorthodoxClownEye, 3);
const splitTxs = subimageTextures(UnorthodoxClownLegsSplit, 2);
const footTxs = subimageTextures(UnorthodoxClownFoot, 3);

export function clownUnorthodox() {
    const health = clownHealth(660);

    const debugAoe = false;

    const consts = {
        headNudgeH: 3,
        headNudgeV: 2,
        legh: 8,
        gravity: 0.5,
        damage: {
            slamAerial: 25,
            slamGround: 45,
            slamWave: 25,
            pounceGround: 30,
        }
    }

    let _height = consts.legh;

    const controls = {
        head: {
            attachOffset: vnew()
        },
        face: {
            unit: -1,
        },
        eyes: {
            closedUnit: 0,
            closing: false,
            forceWide: false,
        },
        pupils: {
            left: vnew(),
            right: vnew(),
            forceCenter: false,
        },
        brows: {
            angry: false
        },
        mouth: {
            excited: false,
            big: false,
        },
        legs: {
            l: {
                y: 0,
                i: 0,
            },
            r: {
                y: 0,
                i: 0,
            },
            splits: false,
            get height() {
                return Math.round(_height);
            },
            set height(value) {
                _height = value;
            }
        }
    };

    const behaviors = {
        facePlayer: true,
        attached: true,
        headDetach: vnew(),
        legs: {
            approachPlayerHsp: Undefined<number>(),
            gravity: consts.gravity,
            speed: vnew(),
        },
        allowNudge: false,
    };

    async function jumpCharge(down = 500, wait = 50, up = 100) {
        const x = [controls.legs.l, controls.legs.r];

        await lerp(controls.legs, 'height').to(0).over(down);
        await sleep(wait);
        await lerp(controls.legs, 'height').to(consts.legh).over(up);

        return x;
    }

    async function jumpRecover(down = 70, wait = 50, up = 200) {
        await jumpCharge(down, wait, up);
    }

    const moves = {
        async quickPounce() {
            const x = await jumpCharge(400);

            behaviors.legs.speed.y = -8;
            x.forEach(x => x.i = 1);
            await wait(() => behaviors.legs.speed.y > 0);
            x.forEach(x => x.i = 2);
            await wait(() => behaviors.legs.speed.y === 0);
            x.forEach(x => x.i = 0);
            aoe.new(32, 12, 20, consts.damage.pounceGround).at(legs).add(-16, -10);
            await jumpRecover();
        },
        async slam() {
            controls.brows.angry = true;
            const x = await jumpCharge(700, 200, 50);
            behaviors.legs.approachPlayerHsp = Math.sign(player.x - legs.x);
            behaviors.legs.speed.y = -8;
            x.forEach(x => x.i = 1);
            await wait(() => behaviors.legs.speed.y > 0);

            controls.legs.splits = true;
            behaviors.legs.gravity = 0;
            behaviors.legs.speed.y = 0;

            await sleep(1_000);

            behaviors.legs.approachPlayerHsp = undefined;

            behaviors.legs.gravity = consts.gravity * 1.5;
            controls.legs.height = 5 - 11;
            legs.y -= 11;

            await wait(() => behaviors.legs.speed.y > 0);
            const splitsBox = aoe.new(68, 12, 10000, consts.damage.slamAerial, 0x00ff00)
                .withStep(() => splitsBox.at(legs).add(-34, -10));
            wait(() => behaviors.legs.speed.y > 8).then(() => splitsBox.damage = consts.damage.slamGround);
            await wait(() => behaviors.legs.speed.y === 0);
            splitsBox.destroy();
            aoe.new(68, 12, 30, consts.damage.slamGround).at(legs).add(-34, -10);
            const args1 = { dx: 1, life: 30, count: 6, damage: 20, ms: 33, w1: 10, w2: 10, h1: 32, h2: 64 };
            wave(args1).at(legs).show().add(24, 0);
            wave({ ...args1, dx: args1.dx * -1 }).at(legs).show().add(-24, 0);
            controls.brows.angry = false;
            await sleep(500);
            controls.legs.splits = false;
            x.forEach(x => x.i = 0);
            await lerp(controls.legs, 'height').to(consts.legh).over(200);
            behaviors.legs.gravity = consts.gravity;
        }
    };

    /*
    for (let i = 0; i < 2; i++) {
                const leg = x[i];
                leg.i = 1;
                await lerp(leg, 'y').to(-12).over(400);
                leg.i = 0;
                await sleep(100);
                leg.i = 2;
                await lerp(leg, 'y').to(0).over(200);
                leg.i = 0;
                await sleep(100);
            }
     */

    async function legsAs() {
        await wait(() => behaviors.legs.speed.y > 0);
        await wait(() => behaviors.legs.speed.y === 0);
        while (true) {
            if (player.x > legs.x - 80 && player.x < legs.x + 80 && player.y < legs.y - 20 && rng() > 0.25)
                await moves.quickPounce();
            else
                await moves.slam();
        }
    }

    async function headAs() {
        await wait(() => !behaviors.attached);
    }

    function hair() {
        const wigglies = [hairTextures[1], hairTextures[2]].map((x, i) => {
            const s = Sprite.from(x);
            s.y = 16;
            s.anchor.y = s.y / 30;
            s.withStep(() => {
                s.scale.y = 1 + (1 + Math.sin(now.s * Math.PI * 3 + i * 0.3)) * 0.125 / 3;
                s.height = Math.round(s.height / 2) * 2;
            });
            return s;
        })
        const c = container(Sprite.from(hairTextures[0]), ...wigglies);
        c.withStep(() => {
            c.angle = behaviors.attached ? controls.head.attachOffset.x * 0.4 : 0;
        })
        c.pivot.set(41, 15);

        const c2 = container(c);
        c2.pivot.set(1 - 41, 1 - 15);
        // c2.angle = 10;
        return c2;
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

    function newFoot(fcontrols: {y: number, i: number}) {
        const g = new Graphics()
            .withStep(() => {
                const height = controls.legs.height + fcontrols.y;
                g.clear()
                if (height > 0)
                    g.beginFill(0xffffff)
                        .drawRect(0, 0, 5, height)
                        .beginFill(0x0D1C7C)
                        .drawRect(0, 0, 5, Math.min(2 + Math.max(0, controls.head.attachOffset.y), height));
                s.y = height - 1;
                s.texture = footTxs[fcontrols.i];
            });
        const s = Sprite.from(footTxs[0]);

        return container(g, s);
    }

    function newLegs() {
        const joint = Sprite.from(UnorthodoxClownJoint);
        joint.anchor.set(6/12, 1);

        const splits = Sprite.from(splitTxs[1])
            .withStep(() => {
                splits.texture = splitTxs[behaviors.attached ? 0 : 1];
                splits.visible = controls.legs.splits;
                legs.visible = !splits.visible;
            });

        splits.anchor.set(34 / 68, 11 / 16);

        const line = new Graphics()
            .withStep(() => {
                const y1 = controls.legs.height + Math.max(controls.legs.l.y, controls.legs.r.y);
                const y2 = controls.legs.height + Math.min(controls.legs.l.y, controls.legs.r.y) + 11;
                line
                    .clear()
                    .lineStyle(1, 0x0D1C7C)
                    .moveTo(0, Math.min(0, y1))
                    .lineTo(0, y2);
                if (y2 > y1)
                    line
                        .lineStyle(1, 0x5B463D)
                        .moveTo(0, y1)
                        .lineTo(0, y2)
            })

        const footl = newFoot(controls.legs.l).at(-1, 0);
        footl.scale.x = -1;
        const footr = newFoot(controls.legs.r).at(0, 0);

        const legs = container(footl, footr, line);

        return container(joint, splits, legs);
    }

    function newEye(p: Vector) {
        const eye = container();

        const pupil = Sprite.from(eyeTxs[1])
            .withStep(() => pupil.at(p));

        const pupilc = container(pupil).show(eye);
        pupilc.mask = Sprite.from(eyeTxs[0]).show(pupilc);

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

        const face = container().show(bald);

        const eyeL = newEye(controls.pupils.left);
        const eyeR = newEye(controls.pupils.right);
        const cer = container(eyeR).at(15, 0);
        const eyes = container(eyeL, cer).at(23, 6).show(face);

        const mouth = newMouth().at(29, 24).show(face);

        const features = Sprite.from(UnorthodoxClownFace).at(8, 19).show(face);

        const browL = eyebrow();
        const browR = eyebrow();
        browR.scale.x = -1;
        const cbr = container(browR).at(15, 0);

        const v = vnew();

        const brows = container(browL, cbr);
        face.withStep(() => {
            if (behaviors.facePlayer) {
                const f = player.getBounds().center.add(hitbox.getBounds().center, -1).normalize();
                controls.face.unit = approachLinear(controls.face.unit, f.x, 0.05);

                v.at(f.x * 4, nlerp(-2, 5, (f.y + 1) / 2));
                moveTowards(controls.pupils.left, v, 1);
                controls.pupils.right.at(controls.pupils.left);
            }

            if (controls.pupils.forceCenter) {
                controls.pupils.left.at(0, 0);
                controls.pupils.right.at(controls.pupils.left);
            }

            const f = (controls.face.unit + 1) / 2;
            face.x = nlerp(-19, 1, f);

            const yf = Math.max(0, (Math.abs(controls.face.unit) - .8) * 5);
            face.y = yf * -1;

            brows.at(face).add(41, 18);

            if (behaviors.facePlayer) {
                const d = rectangleDistance(hitbox, player);
                if (d < 10)
                    brows.y -= 1;
                if (d < 20)
                    brows.y -= 1;
            }
        });

        const c = container(bald, hair(), brows);

        const hitbox = new Graphics()
            .beginFill(0)
            .drawRect(18, 15, 50 - 6, 33)
            .hide()
            .show(c);

        return merge(c, { mouth, hit: hitbox });
    }

    const head = newHead();
    head.pivot.set(40, 63)
    let invulerable = 0;

    head.withStep(() => {
        if (invulerable-- > 0)
            head.visible = !head.visible;
        else
            head.visible = true;

        const canReceiveDamage = invulerable <= 0
            && head.hit.collides(player)
            && !player.collides(aoe.hitboxes)
            && (Math.abs(player.hspeed) + Math.abs(player.vspeed)) > 0.5;

        if (canReceiveDamage) {
            ClownHurt.play();
            const b = bouncePlayerOffDisplayObject(head.hit).normalize();
            if (behaviors.allowNudge) {
                if (Math.abs(b.x) > .7)
                    behaviors.headDetach.x += -Math.sign(b.x) * consts.headNudgeH;
                else if (b.y < 0)
                    behaviors.headDetach.y += consts.headNudgeV;
            }
            health.damage();
            invulerable = 15;
        }
    })

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
            // while (true) {
            //     await sleep(4000);
            //     behaviors.facePlayer = !behaviors.facePlayer;
            // }
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

    const legs = newLegs();

    head.once('added', () => {
        legs.at(head).add(40, 52);
        head.parent.addChildAt(legs, 0);
    });

    head.withAsync(headAs);
    legs.withAsync(legsAs);

    const aoe = new AoeHitboxes();
    aoe.visible = debugAoe;

    const gravity = newGravity(legs, behaviors.legs.speed, [ 0, -6 ], 6);
    legs.withStep(() => {
        legs.pivot.set(0, controls.legs.height + 11);
        gravity(behaviors.legs.gravity);
        if (behaviors.legs.approachPlayerHsp !== undefined) {
            if (Math.sign(player.x - legs.x) === Math.sign(behaviors.legs.approachPlayerHsp))
                legs.x += behaviors.legs.approachPlayerHsp;
        }
        if (behaviors.attached) {
            moveTowards(controls.head.attachOffset, behaviors.headDetach, 0.5);
            head.at(legs).add(0, -controls.legs.height).add(controls.head.attachOffset);
            if (head.hit.collides(player) && behaviors.legs.speed.y < 0)
                player.y += behaviors.legs.speed.y;
        }
    });

    return head;
}

