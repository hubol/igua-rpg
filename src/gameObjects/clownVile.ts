import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {
    VileClownArmRest, VileClownArmSide,
    VileClownArmUp,
    VileClownEar,
    VileClownEyebrow,
    VileClownEyelid, VileClownFoot,
    VileClownHair,
    VileClownHead,
    VileClownMouth, VileClownPupil
} from "../textures";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {flipH} from "../utils/pixi/flip";
import {now} from "../utils/now";
import {moveTowards, Vector, vnew} from "../utils/math/vector";
import {approachLinear, cyclic, lerp as nlerp} from "../utils/math/number";
import {getWorldCenter, getWorldPos} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";
import {lerp} from "../cutscene/lerp";
import {Force} from "../utils/types/force";
import {move} from "../cutscene/move";
import {clownHealth} from "./utils/clownUtils";
import {
    ClownExplode,
    ClownHurt,
    UnorthodoxCharge,
    VileFlail,
    VileJump,
    VileRoar,
    VileSpit,
    VileStep,
    VileStepR
} from "../sounds";
import {bouncePlayerOffDisplayObject} from "../igua/bouncePlayer";
import {wait} from "../cutscene/wait";
import {confetti} from "./confetti";
import {newGravity} from "./utils/newGravity";
import {attack, attackRunner} from "./attacks";
import {Undefined} from "../utils/types/undefined";
import {rayIntersectsWallDistance} from "../igua/logic/rayIntersectsWall";
import {spikeVile, spikeVilePreview} from "./spikeVile";
import {WeakToSpells} from "../pixins/weakToSpells";

const unitv = {
    left: [-1, 0],
    right: [1, 0],
}

export const clownVileDamage = {
    flailUp: 45,
    flailSide: 50,
    spike: 40,
}

export function clownVile() {
    const health = clownHealth(1200);

    let footl = Force<Foot>();
    let footr = Force<Foot>();

    function getLegHeight() {
        return footr.y - c.y;
    }

    function stretchLegs(target: number) {
        const dy = target - getLegHeight();
        return move(c).off(0, -dy);
    }

    async function resetFeetPose(ms: number) {
        const p1 = move(footr).off((c.x + 10) - footr.x, 0).over(ms);
        await move(footl).off((c.x - 10) - footl.x, 0).over(ms);
        await p1;
    }

    const head = vileHead().at(-24, -32);
    const arml = arm().show(head, 0);
    const armr = arm(false).show(head, 0);

    const hurtbox = new Graphics().beginFill(0xff0000).drawRect(4, 2, 41, 26).show(head).hide();

    let invulnerable = 0;

    const runner = attackRunner().show(head);

    const flee = attack({ ms: 100, dx: -40 })
        .withAsyncOnce(async ({ ms, dx }) => {
            head.expression = Expression.Hostile;
            hitWall = false;

            const front = dx < 0 ? footl : footr;
            const rear = dx < 0 ? footr : footl;
            const bounce = -2;

            const prepMs = ms * 2.5;
            await Promise.all([stretchLegs(40).over(prepMs), resetFeetPose(prepMs)]);
            while (true) {
                front.speed.y = bounce;
                await move(front).off(dx, 0).over(ms);
                await move(c).off(dx, 0).over(ms);
                rear.speed.y = bounce;
                await move(rear).off(dx, 0).over(ms);
                if (hdistToPlayer() > 160 || hitWall || isNearWall())
                    break;
            }
        });

    const cv = vnew();

    function hdistToPlayer() {
        return Math.abs(player.x - c.x);
    }

    function freeSpaceOn(unit: Vector) {
        return Math.min(
            rayIntersectsWallDistance(cv.at(c).add(0, -96), unit),
            rayIntersectsWallDistance(cv.at(c).add(0, -40), unit),
            rayIntersectsWallDistance(cv.at(c), unit));
    }

    function freeSpaceOnLeft() {
        return freeSpaceOn(unitv.left);
    }

    function freeSpaceOnRight() {
        return freeSpaceOn(unitv.right);
    }

    function isNearWall() {
        return freeSpaceOnLeft() < 60
            || freeSpaceOnRight() < 60;
    }

    let healthUnitAtLastFlee = 2;
    const maybeFlee = async (ms = 100) => {
        if (health.unit > healthUnitAtLastFlee - 0.21)
            return false;
        const pd = hdistToPlayer();
        if (pd > 108)
            return false;

        const leftd = freeSpaceOnLeft();
        const rightd = freeSpaceOnRight();
        const playerIsClose = pd < 32;
        const goLeft = playerIsClose ? leftd > rightd : player.x > c.x && leftd > 80;
        const goRight = playerIsClose ? rightd > leftd : player.x < c.x && rightd > 80;

        if (!goLeft && !goRight)
            return false;

        healthUnitAtLastFlee = health.unit;
        const dx = (goLeft ? -1 : 1) * 40;
        await runner.run(flee({ dx, ms }));
        return true;
    }

    function mouthv() {
        return getWorldCenter(head.mouth);
    }

    const spit = attack()
        .withAsyncOnce(async ({}) => {
            let dx = player.x < c.x ? -1 : 1;
            dx *= hdistToPlayer() * 0.02;
            const speed = vnew().at(dx, -2 - rng());
            if (hdistToPlayer() < 48)
                speed.y -= 2;
            let prevEndX = Force<number>();

            for (let i = 0; i <= 5; i++) {
                head.expression = Expression.ChargeSpit;
                head.automation.facePlayer = false;
                head.automation.chargeSpitSpeed = 2.25;

                const pv = spikeVilePreview(speed).show(c).withStep(() => pv.at(mouthv()).add(c, -1));
                if (prevEndX !== undefined) {
                    pv.withStep(() => {
                        const f = Math.abs(speed.x) < 1 ? 0.3 : 0.1;
                        if (Math.abs(pv.end.x - prevEndX) < 15)
                            speed.x += dx * f;
                    });
                }

                await wait(() => head.isSpitCharged);
                VileSpit.play();
                head.expression = Expression.Spit;
                head.automation.facePlayer = false;
                await sleep(50);
                prevEndX = pv.end.x;
                pv.destroy();
                const s = spikeVile().damageSource(c).at(mouthv()).show();
                s.speed.at(speed);

                await sleep(150);
                if (i >= 1 && (hdistToPlayer() > 96 || hdistToPlayer() < 32 || Math.sign(speed.x) !== Math.sign(player.x - c.x)))
                    break;
            }
        });

    const rush = attack({ dx: 1, prepMs: 1000 })
        .withAsyncOnce(async ({ dx, prepMs }) => {
            VileRoar.play();
            head.expression = Expression.Yell;

            const right = dx > 0;
            if (right) {
                armr.state = Arm.Side;
                arml.state = Arm.Relax;
            }
            else {
                arml.state = Arm.Side;
                armr.state = Arm.Relax;
            }

            await Promise.all([stretchLegs(16).over(prepMs), resetFeetPose(prepMs)]);

            head.expression = Expression.Evil;

            const distance = (right ? freeSpaceOnRight() : freeSpaceOnLeft()) * 0.9 * Math.sign(dx);
            const front = right ? footr : footl;
            const back = right ? footl : footr;
            const ms = Math.abs(distance) * 1250 / 128 / Math.abs(dx);
            const p1 = move(c).off(distance, 0).over(ms);
            const p2 = move(front).off(distance, 0).over(ms - 100);
            const p3 = move(back).off(distance, 0).over(ms + 300);
            await Promise.all([ p1, p2, p3 ]);
            armr.state = Arm.Relax;
            arml.state = Arm.Relax;
        })
        .withAsync(async ({ dx }) => {
            await wait(() => head.expression === Expression.Evil);

            const front = dx > 0 ? footr : footl;
            const rear = dx > 0 ? footl : footr;
            const bounce = -2;

            const ms = 300 / Math.abs(dx);

            while (true) {
                front.speed.y = bounce;
                await sleep(ms);
                rear.speed.y = bounce;
                await sleep(ms);
            }
        });

    const rushTowardsPlayer = () => {
        const right = player.x > c.x || freeSpaceOnLeft() < 100;
        const aggressive = health.unit < 0.5;
        const f = aggressive ? 3.3 : 2.2;
        const prepMs = aggressive ? 600 : 1000;
        return rush({ dx: (right ? 1 : -1) * f, prepMs });
    }

    const jump = attack({ dx: 0, flailSoundId: -1 })
        .withAsyncOnce(async ({ dx }, self) => {
            UnorthodoxCharge.play();
            const aggressive = health.unit < 0.67;
            if (aggressive) {
                arml.state = Arm.Up;
                armr.state = Arm.Up;

                self.flailSoundId = VileFlail.play();
                VileFlail.volume(0, self.flailSoundId);
                VileFlail.fade(0, 1, 2000, self.flailSoundId);
                VileFlail.loop(true, self.flailSoundId);
            }

            head.expression = Expression.Happy;
            await move(c).off(0, 10).over(aggressive ? 200 : 330);
            VileJump.play();
            speed.y = -7;
            grav = 0.2;
            speed.x = dx;
            footl.speed.x = dx;
            footr.speed.x = dx;
            const panic = sleep(2000);
            const landed = wait(() => speed.y > 0).then(() => wait(() => footl.isOnGround));
            await Promise.race([ panic, landed ]);
            speed.x = 0;
            footl.speed.x = 0;
            footr.speed.x = 0;

            arml.state = Arm.Relax;
            armr.state = Arm.Relax;
        })
        .withCleanup(({ flailSoundId }) => {
            VileFlail.fade(1, 0, 300, flailSoundId);
            setTimeout(() => VileFlail.stop(flailSoundId), 300);
        });

    const jumpIntoFreeSpace = () =>
        jump({dx: (freeSpaceOnLeft() > freeSpaceOnRight() ? -1 : 1) * (rng() + 1)})

    let attackCount = 0;

    async function doAs() {
        await wait(() => c.hostile);
        VileRoar.play();
        head.expression = Expression.Surprise;
        await sleep(300);
        head.expression = Expression.Hostile;
        while (true) {
            await maybeFlee();
            if (attackCount % 4 === 0)
                await runner.run(jumpIntoFreeSpace());
            else if (attackCount % 2 === 1)
                await runner.run(rushTowardsPlayer());
            else if (attackCount % 4 === 2) {
                for (let i = 0; i < 2; i++)
                    await runner.run(jumpIntoFreeSpace());
            }
            await maybeFlee();
            await runner.run(spit());
            attackCount++;
        }
    }

    function onSpawnedWithPosition() {
        if (footl) return;
        footl = leg(c, [-10, 0]).at([-10, 20].add(c));
        footr = leg(c, [10, 0]).at([10, 20].add(c));
    }

    function die() {
        ClownExplode.play();
        confetti(32, 64).at(getWorldCenter(head)).ahead();
        c.destroy();
    }

    const knockback = vnew();

    function takeDamage() {
        if (player.collides(hurtbox) && invulnerable <= 0) {
            knockback.add(c.vcpy().add(player, -1).normalize().scale(4));
            c.hostile = true;
            bouncePlayerOffDisplayObject(hurtbox);
            invulnerable = 15;
            ClownHurt.play();
            if (health.damage())
                return die();
        }

        if (Math.abs(knockback.x) > Math.abs(knockback.y) && Math.abs(knockback.x) >= 1) {
            c.x += Math.sign(knockback.x);
            knockback.x -= Math.sign(knockback.x);
        }
        else if (Math.abs(knockback.y) >= 1) {
            c.y += Math.sign(knockback.y);
            knockback.y -= Math.sign(knockback.y);
        }

        if (runner.current === jump && player.collides(hurtbox) && speed.y < 0)
            player.y += speed.y;

        if (runner.current === flee && player.collides(hurtbox))
            player.x += speed.x;

        head.visible = invulnerable-- > 0 ? !head.visible : true;
    }

    let hitWall = false;
    let grav = 0;

    function doHeadPhysics() {
        if (runner.current !== jump)
            grav = 0;
        let gravScale = 1;
        if (speed.y > 0 && (footl.length < 32 || footr.length < 32)) {
            gravScale = 0;
            speed.y *= 0.5;
        }

        const r = gravity(grav * gravScale);
        if (r.hitWall)
            hitWall = true;
    }

    const c = merge(container(head), { hostile: false })
        .withPixin(WeakToSpells({ spellsHurtbox: [hurtbox], clownHealth: health }))
        .withStep(doHeadPhysics)
        .withStep(takeDamage)
        .withAsync(doAs)
        .withAsync(async () => {
            await health.tookDamage();
            c.hostile = true;
        });

    c.damageSource(c);

    c.transform.onPositionChanged(onSpawnedWithPosition);

    const speed = vnew();
    const gravity = newGravity(c, speed, [0, -25], 25);

    return c;
}

enum Arm {
    Up,
    Relax,
    Side
}

function getTexturesForArm(arm: Arm) {
    switch (arm) {
        case Arm.Up:
            return armUpTxs;
        case Arm.Side:
            return armSideTxs;
    }
    return armRelaxTxs;
}

function arm(left = true) {
    let thisState = Arm.Up;
    let thisStateFor = 0;

    const c = merge(container(), { subimage: left ? 1 : 0, speed: 0, state: Arm.Relax })
        .withStep(() => {
            c.x = left ? 7 : 42;
            c.scale.x = left ? 1 : -1;

            if (thisState !== c.state) {
                thisStateFor = 0;
                thisState = c.state;
                c.subimage = left ? 1 : 0;

                if (c.state === Arm.Up)
                    c.y = 40;
                else if (c.state === Arm.Side)
                    c.pivot.x = -20;
            }

            thisStateFor++;

            const dangerous = Math.abs(c.speed) > 0.1 && thisStateFor > 30;

            if (c.state === Arm.Up) {
                c.y = approachLinear(c.y, 0, 2);
                c.speed = approachLinear(c.speed, 0.3, 0.01);
                if (dangerous && player.collides(hitboxUp)) {
                    c.damagePlayer(clownVileDamage.flailUp);
                    bouncePlayerOffDisplayObject(c.parent, 4);
                }
            }
            else {
                c.y = 0;
            }

            if (c.state === Arm.Side) {
                c.pivot.x = approachLinear(c.pivot.x, 0, 2);
                c.speed = approachLinear(c.speed, 0.4, 0.01);
                if (dangerous && player.collides(hitboxSide)) {
                    c.damagePlayer(clownVileDamage.flailSide);
                    player.hspeed = 0;
                    player.engine.knockback.x = (left ? -1 : 1) * 4;
                }
            }
            else {
                c.pivot.x = 0;
            }

            if (c.state === Arm.Relax) {
                c.speed = 0.05;
            }
        });

    const hitboxUp = new Graphics().beginFill(0xff0000).drawRect(-11, -30, 18, 12).hide();
    const hitboxSide = new Graphics().beginFill(0xff0000).drawRect(-30, 7, 24, 26).hide();

    const s = Sprite.from(armUpTxs[0])
        .withStep(() => {
            const txs = getTexturesForArm(c.state);
            s.texture = txs[Math.floor(cyclic(c.subimage += c.speed, 0, txs.length))];
            s.anchor.at(s.texture.defaultAnchor);
        });

    let life = 0;

    const ghost = Sprite.from(armUpTxs[0])
        .withStep(() => {
            ghost.visible = Math.abs(c.speed) > 0.1;
            life--;
            if (ghost.texture !== s.texture && life <= 0) {
                life = 5;
                ghost.texture = s.texture;
            }
            ghost.anchor.at(ghost.texture.defaultAnchor);
        });
    ghost.alpha = 0.25;

    c.addChild(ghost, s, hitboxUp, hitboxSide);

    return c;
}

const armUpTxs = subimageTextures(VileClownArmUp, { width: 62 }).map(x => {
    x.defaultAnchor.at(35 / 62, 46 / 50)
    return x;
});

const armSideTxs = subimageTextures(VileClownArmSide, { width: 54 }).map(x => {
    x.defaultAnchor.at(41 / 54, 20 / 72)
    return x;
});

const armRelaxTxs = subimageTextures(VileClownArmRest, { width: 12 }).map(x => {
    x.defaultAnchor.at(-8 / 12, -32 / 10)
    return x;
});

const v1 = vnew();
const v2 = vnew();

function leg(src: DisplayObject, srcOff: Vector) {
    const offset = [0, -6];

    const xscale = Math.sign(srcOff.x);
    const stepSound = xscale === 1 ? VileStepR : VileStep;
    const s = Sprite.from(VileClownFoot);
    s.pivot.at(1, 1);
    s.scale.x = xscale;
    const gfx = new Graphics();
    const v = vnew();
    const knee = vnew().at(10 * xscale, 10);
    let footPrevY = Force<number>();
    const leg = container(gfx, s)
        .withStep(() => {
            if (src.destroyed)
                return leg.destroy();

            leg.at(src).add(srcOff);
            const footv = v1.at(foot).add(leg, -1);
            let kx = footv.x / 2 + Math.min(200 / footv.y, 48) * xscale;
            const ky = Math.max(footv.y / 2 + Math.min(footv.x * -xscale, 0), 0);
            v.at(kx, ky);
            if (isNaN(knee.x) || isNaN(knee.y) || !isFinite(knee.x) || !isFinite(knee.y))
                knee.at(v);
            else
                moveTowards(knee, v, 1);
            gfx
                .clear()
                .lineStyle(2, 0x0D1C7C)
                .moveTo(0, -2)
                .quadraticCurveTo(
                    knee.x + Math.round(Math.sin(now.s * Math.PI + xscale) * 2) * 2,
                    knee.y + Math.round(Math.cos(now.s * Math.PI - xscale) * 2) * 2,
                    footv.x, footv.y);

            s.at(footv);
            const fy = getWorldPos(leg).y + footv.y;
            if (footPrevY !== undefined) {
                const diff = fy - footPrevY;
                const target = Math.abs(diff) < 1 ? 0 : Math.sign(diff) * -40 * xscale;
                s.angle = approachLinear(s.angle, target, 10);
            }

            footPrevY = fy;
        })
        .show();

    function getLegNormal() {
        const legn = v2.at(foot).add(leg, -1);
        return [legn];
    }

    const foot = merge(container(), {
        speed: vnew(),
        max: Undefined<number>(),
        get length() { return getLegNormal()[0].vlength; },
        isOnGround: false,
    });
    foot.max = 64;
    const gravity = newGravity(foot, foot.speed, offset, Math.abs(offset.y));
    return foot.withStep(() => {
        if (src.destroyed)
            return foot.destroy();

        if (foot.max !== undefined) {
            const [legn] = getLegNormal();
            if (legn.vlength > foot.max) {
                legn.vlength = foot.max;
                foot.at(leg).add(legn);
                foot.speed.y = 0;
                foot.add(foot.speed);
                foot.isOnGround = false;
                return;
            }
        }
        const r = gravity(0.8);
        const prevOnGround = foot.isOnGround;
        foot.isOnGround = !!r.isOnGround;
        if (!prevOnGround && foot.isOnGround)
            stepSound.play();
    }).show();
}

type Foot = ReturnType<typeof leg>;

enum Expression {
    Resting,
    Hostile,
    Happy,
    Surprise,
    Angry,
    Evil,
    ChargeSpit,
    Spit,
    Yell
}

function vileHead() {
    const controls = {
        eyeL: { pos: vnew(), img: 0 },
        eyeR: { pos: vnew(), img: 0 },
        hair: { y: 0 },
        eyebrows: { img: 0, y: 0 },
        mouth: { pos: vnew(), img: 0 },
        facing: vnew(),
        blink: 0,
        unblink: 0,
        ext1: 0,
    }

    const automation = {
        facePlayer: true,
        lookAtPlayer: true,
        widenEyes: false,
        wiggleEyebrows: 0,
        hairVspeed: 0,
        chargeSpitSpeed: 1,
    }

    const defaultAutomation = { ...automation };

    function resetAutomation() {
        Object.assign(automation, defaultAutomation);
    }
    function resetControls() {
        controls.mouth.pos.at(0, 0);
        controls.mouth.img = 0;
        controls.eyeL.img = 0;
        controls.eyeR.img = 0;
        controls.eyebrows.img = 0;
        controls.eyebrows.y = 0;
    }
    
    let expression = Expression.Resting;

    function showExpression(first = false, auto = {} as typeof automation) {
        if (expression === Expression.Resting) {
            auto.facePlayer = false;
            auto.lookAtPlayer = false;

            if (first) {
                const c = container()
                    .withStep(() => {
                        controls.eyeL.pos.at(controls.eyeR.pos);
                        if (expression !== Expression.Resting)
                            c.destroy();
                    })
                    .withAsync(async () => {
                        while (true) {
                            await move(controls.facing).to(rng.unitVector).over(300 + rng.int(700));
                            await sleep(rng.int(300));
                            const looking = rng.unitVector.scale(rng.int(4));
                            const ms = 200 + rng.int(450);
                            await move(controls.eyeR.pos).to(looking).over(ms);
                            await sleep(rng.int(550) + 250);
                        }
                    })
                    .show(h);
            }
        }
        else if (expression === Expression.Happy) {
            moveTowards(controls.eyeL.pos, [0, 0], 1);
            moveTowards(controls.eyeR.pos, [0, 0], 1);
            controls.eyeL.pos.y += Math.sin(now.s * Math.PI * 5) * 0.67;
            controls.eyeR.pos.y += Math.sin(now.s * Math.PI * 5) * 0.67
            auto.facePlayer = true;
            auto.lookAtPlayer = false;
            auto.widenEyes = true;
            auto.wiggleEyebrows = 0;
            controls.mouth.img = 1;
            controls.eyeL.img = 1;
            controls.eyeR.img = 1;
            controls.facing.y = Math.min(0, controls.facing.y);
        }
        else if (expression === Expression.Surprise) {
            auto.hairVspeed = -2;
            auto.facePlayer = false;
            auto.lookAtPlayer = true;
            auto.widenEyes = true;
            auto.wiggleEyebrows = 1;
            controls.mouth.img = 2;
        }
        else if (expression === Expression.Angry) {
            auto.facePlayer = false;
            auto.lookAtPlayer = true;
            controls.mouth.img = 3;
            controls.eyebrows.img = 1;
        }
        else if (expression === Expression.Evil || expression === Expression.Yell) {
            const f = now.s * Math.PI * 3;
            const v = vnew().at(Math.sin(f) * 3, Math.cos(f) * 6);
            const s = 2;
            moveTowards(controls.eyeL.pos, v, s);
            moveTowards(controls.eyeR.pos, v, s);
            auto.widenEyes = true;
            controls.eyebrows.img = 1;

            if (expression === Expression.Evil) {
                controls.mouth.img = 1;
            }
            else {
                auto.wiggleEyebrows = 1;
                if (first) {
                    controls.ext1 = 0;
                    controls.mouth.img = 4;
                }
                else {
                    controls.ext1 = approachLinear(controls.ext1, 3, 0.1);
                    controls.mouth.img = [8, 7, 8, 3][Math.floor(controls.ext1)];
                }
            }
        }
        else if (expression === Expression.ChargeSpit) {
            if (first) {
                controls.mouth.img = 4;
                controls.eyebrows.y = 2;
            }
            auto.widenEyes = true;
            controls.mouth.img = Math.min(7, controls.mouth.img + 0.1 * automation.chargeSpitSpeed);
            controls.eyebrows.y = Math.max(-2, controls.eyebrows.y - 0.1 * automation.chargeSpitSpeed);
        }
        else if (expression === Expression.Spit) {
            controls.eyeL.pos.vlength = Math.min(controls.eyeL.pos.vlength, 3);
            controls.eyeR.pos.vlength = Math.min(controls.eyeR.pos.vlength, 3);
            auto.lookAtPlayer = false;
            moveTowards(controls.mouth.pos, controls.facing.vcpy().scale(2), 0.2);
            auto.widenEyes = true;
            auto.facePlayer = false;
            controls.mouth.img = 8;
            controls.eyebrows.img = 1;
            controls.eyeL.img = 2;
            controls.eyeR.img = 3;
        }
    }

    function setExpression(e: Expression) {
        resetAutomation();
        resetControls();

        expression = e;

        showExpression(true, automation);
    }

    function newEye(control: { img: number }) {
        const eyebrow = Sprite.from(eyebrowTxs[0]);
        const mask = Sprite.from(eyelidTxs.last);
        const eyelid = Sprite.from(eyelidTxs[0]);
        const pupil = Sprite.from(pupilTxs[0]).filter(alphaMaskFilter(mask));
        const c = merge(container(mask, pupil, eyelid, eyebrow), { pupil, blink: 0, eyebrow })
            .withStep(() => {
                const lookUpF = Math.min(pupil.y, 0) / 12;
                const min = 0.45 + lookUpF;
                const closed = nlerp(nlerp(min, 1, c.blink), 0, controls.unblink);
                pupil.texture = pupilTxs[control.img];
                eyelid.texture = eyelidTxs[Math.floor(Math.max(0, Math.min(1, closed) * eyelidTxs.length))];
                eyebrow.texture = eyebrowTxs[controls.eyebrows.img];
                eyebrow.y = Math.sin(now.s * Math.PI * 6) * automation.wiggleEyebrows + controls.eyebrows.y;
            });

        eyebrow.pivot.at(1, 7);
        pupil.pivot.at(-1, -3);
        c.pivot.at(0, -7);

        return c;
    }

    let __center = Force<DisplayObject>();

    function newHead() {
        const mask = Sprite.from(VileClownHead).at(0, 1);
        const sprite = Sprite.from(VileClownHead);
        __center = sprite;
        const eyeL = newEye(controls.eyeL);
        const eyeR = newEye(controls.eyeR).at(15, 0);
        flipH(eyeR.eyebrow).pivot.x -= 1;
        const mouth = Sprite.from(mouthTxs[0]).at(-2, 18);
        const hair = newHair().at(-8, -14);
        const ears = newEars();
        const face = container(eyeL, eyeR, mouth.filter(alphaMaskFilter(mask)));

        const v = vnew();
        function directFacialFeatures() {
            const ftx = nlerp(-1, 22, (controls.facing.x + 1) / 2);
            const fty = nlerp(-3, 3, (controls.facing.y + 1) / 2);

            const etx = nlerp(2, -2, (controls.facing.x + 1) / 2);
            const ety = nlerp(1, -1, (controls.facing.y + 1) / 2);

            hair.pivot.at(0, Math.max(0, controls.facing.y) * -2 - controls.hair.y).vround();
            controls.hair.y += automation.hairVspeed;
            if (controls.hair.y >= 0) {
                controls.hair.y = 0;
                automation.hairVspeed = 0;
            }
            else
                automation.hairVspeed += 0.4;

            face.moveTowards(v.at(ftx, fty), 1);
            ears.moveTowards(v.at(etx, ety), 1);
        }

        function adjustEyelids() {
            eyeL.blink = controls.blink;
            eyeR.blink = controls.blink;
        }

        function positionPupils() {
            eyeL.pupil.at(controls.eyeL.pos);
            eyeR.pupil.at(controls.eyeR.pos);
        }

        function updateMouth() {
            mouth.texture = mouthTxs[Math.floor(controls.mouth.img)];
            mouth.pivot.at(controls.mouth.pos).scale(-1);
        }

        face
            .withStep(directFacialFeatures)
            .withStep(adjustEyelids)
            .withStep(positionPupils)
            .withStep(updateMouth);

        return merge(container(mask, ears, sprite, hair, face), { eyeL, eyeR, mouth });
    }

    function newEars() {
        const earL = Sprite.from(VileClownEar).at(-7, 12);
        const earR = flipH(Sprite.from(VileClownEar)).at([53, 0].add(earL));
        return container(earL, earR);
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

    function getTrajectory(d: Vector | DisplayObject) {
        const p = getWorldCenter(player);
        const c = 'parent' in d ? getWorldCenter(d) : d;
        return p.add(c, -1);
    }

    const h = merge(newHead(), {
            get expression() { return expression; },
            set expression(e: Expression) { setExpression(e); },
            automation,
            get isSpitCharged() {
                return controls.mouth.img >= 7 && expression === Expression.ChargeSpit;
            }
        })
        .withStep(showExpression)
        .withStep(() => {
            const me = getWorldCenter(__center);
            const target = getTrajectory(me);
            const dist = target.vlength;
            target.normalize();

            if (automation.facePlayer)
                moveTowards(controls.facing, target, 0.1);
            if (automation.lookAtPlayer) {
                const l = dist < 40 ? getWorldCenter(h.eyeL) : me;
                const r = dist < 40 ? getWorldCenter(h.eyeR) : me;
                l.y = me.y;
                r.y = me.y;

                const f = dist < 32 ? dist / 7 : dist / 32;
                const fx = Math.min(4, f);
                const fy = Math.min(6, f);
                const tl = getTrajectory(l).normalize().scale(fx, fy);
                const tr = getTrajectory(r).normalize().scale(fx, fy);

                moveTowards(controls.eyeL.pos, tl, 0.2);
                moveTowards(controls.eyeR.pos, tr, 0.2);
            }
            controls.unblink = nlerp(controls.unblink, automation.widenEyes ? 1 : 0, 0.125);
        })
        .withAsync(async () => {
            while (true) {
                await sleep(500 + rng() * 2000);
                await lerp(controls, 'blink').to(1).over(170);
                await lerp(controls, 'blink').to(0).over(120);
            }
        });

    setExpression(Expression.Resting);

    return h;
}

const eyelidTxs = subimageTextures(VileClownEyelid, 12);
const mouthTxs = subimageTextures(VileClownMouth, { width: 32 });
const eyebrowTxs = subimageTextures(VileClownEyebrow, { width: 16 });
const pupilTxs = subimageTextures(VileClownPupil, { width: 10 });
const hairTxs = subimageTextures(VileClownHair, 4);