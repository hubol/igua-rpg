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
    UnorthodoxClownMouth, UnorthodoxClownSpark, UnorthodoxClownSparkle
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
import {
    ClownExplode,
    ClownHurt,
    UnorthodoxCharge,
    UnorthodoxJump,
    UnorthodoxLand,
    UnorthodoxLiftFoot,
    UnorthodoxSparkBegin,
    UnorthodoxSparkBounce,
    UnorthodoxStomp,
    UnorthodoxTell,
    UnorthodoxUncharge,
    UnorthodoxUnjump,
    UnorthodoxUnscrew
} from "../sounds";
import {lerp} from "../cutscene/lerp";
import {wait} from "../cutscene/wait";
import {newGravity} from "./utils/newGravity";
import {Undefined} from "../utils/types/undefined";
import {AoeHitboxes} from "./utils/aoeHitboxes";
import {wave, WaveArgs} from "./wave";
import {animatedSprite} from "../igua/animatedSprite";
import {electricPath} from "./electricPath";
import {push} from "./walls";
import {scene} from "../igua/scene";
import {confetti} from "./confetti";
import {trove100} from "./valuableTrove";

const hairTextures = subimageTextures(UnorthodoxClownHair, 3);
const mouthTxs = subimageTextures(UnorthodoxClownMouth, 4);
const eyeTxs = subimageTextures(UnorthodoxClownEye, 3);
const splitTxs = subimageTextures(UnorthodoxClownLegsSplit, 2);
const footTxs = subimageTextures(UnorthodoxClownFoot, 3);
const sparkTxs = subimageTextures(UnorthodoxClownSpark, 3);

export function clownUnorthodox() {
    const health = clownHealth(660);

    const debug = {
        aoe: false,
        triggers: false
    }

    const consts = {
        headNudgeH: 3,
        headNudgeV: 2,
        legh: 8,
        gravity: 0.5,
        damage: {
            slamAerial: 30,
            slamGround: 50,
            slamWave: 35,
            pounceGround: 35,
            stompWave: 30,
            spark: 30
        },
        waves: {
            get slam() {
                return <WaveArgs>{ dx: 1, life: 30, count: 6, damage: consts.damage.slamWave, ms: 33, w1: 10, w2: 10, h1: 32, h2: 64 };
            },
            get stomp() {
                return <WaveArgs>{ dx: 1, life: 22, count: 10, damage: consts.damage.stompWave, ms: 33, w1: 8, w2: 8, h1: 96, h2: 128 };
            }
        },
        drop: trove100
    }

    let _height = consts.legh;

    const controls = {
        head: {
            attachOffset: vnew(),
        },
        face: {
            unit: -1,
            y: 0,
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
            dizzy: false,
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
        get isAggressive() {
            return health.unit < 0.5;
        },
        get hasSparkMove() {
            return health.unit < 0.67;
        },
        evade: 0
    };

    function playMovementSounds() {
        let lastSpeedY = behaviors.legs.speed.y;

        return () => {
            const dy = behaviors.legs.speed.y;
            if (Math.sign(dy) !== Math.sign(lastSpeedY) && head.aggressive) {
                if (dy > 0)
                    UnorthodoxUnjump.play();
                else if (dy < 0)
                    UnorthodoxJump.play();
            }
            lastSpeedY = dy;
        };
    }

    async function jumpCharge(down = 500, wait = 50, up = 100) {
        const x = [controls.legs.l, controls.legs.r];

        if (behaviors.isAggressive) {
            down *= 0.75;
            wait *= 0.75;
            up *= 0.75;
        }

        await lerp(controls.legs, 'height').to(0).over(down);
        await sleep(wait);
        await lerp(controls.legs, 'height').to(consts.legh).over(up);

        return x;
    }

    async function jumpRecover(down = 70, wait = 50, up = 200) {
        UnorthodoxUncharge.play();
        await jumpCharge(down, wait, up);
    }

    const moves = {
        async quickPounce() {
            UnorthodoxCharge.play();
            const x = await jumpCharge(400);

            behaviors.legs.speed.y = -8;
            x.forEach(x => x.i = 1);
            await wait(() => behaviors.legs.speed.y > 0);
            x.forEach(x => x.i = 2);
            await wait(() => behaviors.legs.speed.y === 0);
            UnorthodoxLand.play();
            x.forEach(x => x.i = 0);
            aoe.new(32, 12, 20, consts.damage.pounceGround).at(legs).add(-16, -10);
            await jumpRecover();
        },
        async slam() {
            const aggressive = behaviors.isAggressive;
            const recovery = aggressive ? 350 : 500;

            controls.brows.angry = true;
            UnorthodoxCharge.play();
            const x = await jumpCharge(700, 200, 50);
            behaviors.legs.approachPlayerHsp = Math.sign(player.x - legs.x);
            if (aggressive)
                behaviors.legs.approachPlayerHsp *= 2;
            behaviors.legs.speed.y = -8;
            x.forEach(x => x.i = 1);
            await wait(() => behaviors.legs.speed.y > 0);

            controls.legs.splits = true;
            behaviors.legs.gravity = 0;
            behaviors.legs.speed.y = 0;

            if (aggressive)
                await Promise.race([
                    sleep(500),
                    wait(() => Math.abs(player.x - legs.x) < 10 || Math.sign(player.x - legs.x) !== Math.sign(behaviors.legs.approachPlayerHsp!))
                        .then(() => sleep(150))
                ]);
            else
                await sleep(1_000);

            behaviors.legs.approachPlayerHsp = undefined;

            behaviors.legs.gravity = consts.gravity * 1.5;
            controls.legs.height = 5 - 11;
            legs.y -= 11;

            await wait(() => behaviors.legs.speed.y > 0);
            const splitsBox = aoe.new(68, 12, 10000, consts.damage.slamAerial).tinted(0x00ff00)
                .withStep(() => splitsBox.at(legs).add(-34, -10));
            wait(() => behaviors.legs.speed.y > 8).then(() => splitsBox.damage = consts.damage.slamGround);
            await wait(() => behaviors.legs.speed.y === 0);
            UnorthodoxStomp.play();
            splitsBox.destroy();
            aoe.new(68, 12, 30, consts.damage.slamGround).at(legs).add(-34, -10);
            wave(consts.waves.slam).at(legs).show(projectiles).add(24, 0);
            wave({ ...consts.waves.slam, dx: consts.waves.slam.dx * -1 }).at(legs).show(projectiles).add(-24, 0);
            controls.brows.angry = false;
            await sleep(recovery);
            controls.legs.splits = false;
            x.forEach(x => x.i = 0);
            await lerp(controls.legs, 'height').to(consts.legh).over(recovery * (2 / 5));
            behaviors.legs.gravity = consts.gravity;
            behaviors.evade = 0;
        },
        async stomp(control: { y: number, i: number }) {
            const up = behaviors.isAggressive ? 100 : 200;
            const down = behaviors.isAggressive ? 67 : 30;
            const delay = behaviors.isAggressive ? 125 : 250;

            const dx = control === controls.legs.r ? 1 : -1;
            const fu = lerp(controls.face, 'y').to(-2).over(up);
            UnorthodoxLiftFoot.play();
            await lerp(control, 'y').to(-8).over(up + rng.int(up));
            const s = sparkle().at([dx * 24, -20].add(legs)).show();
            control.i = 2;
            await wait(() => s.destroyed);
            control.i = 0;
            await fu;
            const fd = lerp(controls.face, 'y').to(0).over(down);
            await lerp(control, 'y').to(0).over(down);
            UnorthodoxStomp.play();
            wave({ ...consts.waves.stomp, dx }).at(legs).show(projectiles).add(dx * 4);
            await fd;
            await sleep(delay);
        },
        async spark() {
            controls.pupils.dizzy = true;
            const v = [0, -controls.legs.height - 17].add(legs);
            const h = health.health;
            UnorthodoxUnscrew.play();
            const rise = lerp(controls.head.attachOffset, 'y').to(-12).over(1_500);
            spark().at(v).ahead();
            await sleep(500);
            const a1 = electricArc(v, 1);
            const a2 = electricArc(v, -1);
            await rise;
            await Promise.race([sleep(1250), wait(() => health.health < h)]);
            controls.pupils.dizzy = false;
            UnorthodoxSparkBounce.play();
            a1.die();
            a2.die();
            await sleep(125);
            if (health.health < h) {
                if (player.collides(triggers.stomp))
                    await doStompInPlayerDirection(false);
                else
                    await moves.quickPounce();
            }
            await lerp(controls.head.attachOffset, 'y').to(0).over(250);
        }
    };

    function doMove<T>(fn: T) {
        for (const x of Object.values(moves) as any[]) {
            if (x !== fn)
                x.count = 0;
        }
        // @ts-ignore
        fn.count = fn.count ? fn.count + 1 : 1;
        return fn;
    }

    function count(fn: (...args: any[]) => unknown): number {
        // @ts-ignore
        return fn.count ? fn.count : 0;
    }

    async function doStompInPlayerDirection(move = true) {
        const leg = player.x > head.x ? controls.legs.r : controls.legs.l;
        if (move)
            await doMove(moves.stomp)(leg);
        else
            await moves.stomp(leg);
    }

    async function maybeDoSparkOr(move: () => Promise<unknown>) {
        if (!behaviors.hasSparkMove || count(moves.spark) > 0 || rng.bool)
            return doMove(move)();
        await doMove(moves.spark)();
    }

    async function legsAs() {
        legs.withStep(() => behaviors.evade++);
        let idle = 0;
        await wait(() => behaviors.legs.speed.y > 0);
        await wait(() => behaviors.legs.speed.y === 0);
        await wait(() => head.aggressive);
        while (true) {
            if (behaviors.evade > 15 * 60)
                await doMove(moves.slam)();
            else if (player.collides(triggers.pounce) && count(moves.quickPounce) < 1) {
                if (count(moves.slam) >= 1 || rng() > 0.3)
                    await maybeDoSparkOr(moves.quickPounce);
                else
                    await doMove(moves.slam)();
            }
            else if (player.collides(triggers.spark) && count(moves.spark) < 1 && behaviors.hasSparkMove)
                await doMove(moves.spark)();
            else if (player.collides(triggers.stomp) && count(moves.stomp) < 2)
                await doStompInPlayerDirection();
            else if (count(moves.slam) < 2 || idle > 120) {
                idle = 0;
                await doMove(moves.slam)();
            }
            else {
                idle++;
                await sleep(1);
            }
        }
    }

    async function headAs() {
        await wait(() => !behaviors.attached);
    }

    function electricArc(v: Vector, hsp: number, vsp = -3, gravity = 0.1) {
        const ivsp = vsp;
        hsp *= 1.45;
        v = v.vcpy();
        const w = vnew();
        let isOnGround = false;
        const p = electricPath(() => player.damage(consts.damage.spark), 2)
            .show(projectiles)
            .withStep(() => {
                if (p.isDying && (isOnGround || v.y > scene.height))
                    return;
                p.to(v);
                v.add(hsp, vsp);
                const r = push(w.at(v), 8);

                if (r.isOnGround) {
                    // isOnGround = true;
                    v.y = w.y;
                    vsp = ivsp;
                    UnorthodoxSparkBounce.play();
                }
                else
                    vsp += gravity;
            })

        return p;
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

            if (controls.pupils.dizzy) {
                const x = now.s * Math.PI * 4;
                controls.pupils.left.at(Math.sin(x) * 4, Math.cos(x) * 4);
                controls.pupils.right.at(controls.pupils.left);
            }

            if (controls.pupils.forceCenter) {
                controls.pupils.left.at(0, 0);
                controls.pupils.right.at(controls.pupils.left);
            }

            const f = (controls.face.unit + 1) / 2;
            face.x = nlerp(-19, 1, f);

            const yf = Math.max(0, (Math.abs(controls.face.unit) - .8) * 5);
            face.y = yf * -1 + controls.face.y;

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

    const head = merge(newHead(), { aggressive: false });
    head.pivot.set(40, 63)
    let invulerable = 0;

    head.withStep(playMovementSounds());

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
            head.aggressive = true;
            ClownHurt.play();
            const b = bouncePlayerOffDisplayObject(head.hit).normalize();
            if (behaviors.allowNudge) {
                if (Math.abs(b.x) > .7)
                    behaviors.headDetach.x += -Math.sign(b.x) * consts.headNudgeH;
                else if (b.y < 0)
                    behaviors.headDetach.y += consts.headNudgeV;
            }
            behaviors.evade += 180;
            if (health.damage()) {
                const v = consts.drop().at(head).show().add(0, -20);
                confetti(32, 64).at(v).ahead();
                UnorthodoxUnscrew.stop();
                head.destroy();
                ClownExplode.play();
            }
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
    const projectiles = container();

    head.once('added', () => {
        legs.at(head).add(40, 52);
        head.parent.addChildAt(legs, 0);
        head.parent.addChild(projectiles);
    });

    head.once('removed', () => {
        legs.destroy();
        projectiles.destroy();
    });

    head.withAsync(headAs);
    legs.withAsync(legsAs);

    const aoe = new AoeHitboxes();
    aoe.visible = debug.aoe;

    const gravity = newGravity(legs, behaviors.legs.speed, [ 0, -6 ], 6);
    legs.withStep(() => {
        legs.pivot.set(0, controls.legs.height + 11);
        gravity(behaviors.legs.gravity);
        if (behaviors.legs.approachPlayerHsp !== undefined) {
            if (Math.sign(player.x - legs.x) === Math.sign(behaviors.legs.approachPlayerHsp))
                legs.x += behaviors.legs.approachPlayerHsp;
        }
        if (behaviors.attached) {
            // moveTowards(controls.head.attachOffset, behaviors.headDetach, 0.5);
            head.at(legs).add(0, -controls.legs.height).add(controls.head.attachOffset);
            if (head.hit.collides(player) && behaviors.legs.speed.y < 0)
                player.y += behaviors.legs.speed.y;
        }
    });

    const tc = new AoeHitboxes(legs);
    tc.visible = debug.triggers;
    const triggers = {
        stomp: [
            tc.new(180, 70).at(-90, -30 + 15).tinted(0xff0000),
            tc.new(50, 80).at(50, -80).tinted(0xff0000),
            tc.new(50, 80).at(50 - 150, -80).tinted(0xff0000)],
        spark: [
            tc.new(100, 70).at(90, -50).tinted(0x0000ff),
            tc.new(100, 70).at(-90 -100, -50).tinted(0x0000ff),
            tc.new(80, 60).at(60, -100).tinted(0x0000ff),
            tc.new(80, 60).at(-60 - 80, -100).tinted(0x0000ff)],
        pounce: tc.new(96, 180).at(-48, -210 + 5).tinted(0x00ff00),
    }

    return head;
}

const sparkleTxs = subimageTextures(UnorthodoxClownSparkle, 5);

function sparkle() {
    UnorthodoxTell.play();
    return animatedSprite(sparkleTxs, 0.3, true).centerAnchor();
}

function spark() {
    UnorthodoxSparkBegin.play();
    const s = animatedSprite(sparkTxs, 0.3)
        .centerAnchor()
        .withAsync(async () => {
            await sleep(500);
            s.destroy();
        })
    return s;
}