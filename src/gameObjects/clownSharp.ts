import {SharpClownBullet, SharpClownFork, SharpClownHead, SharpClownLegs, SharpClownTail} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {hat} from "./hat";
import {merge} from "../utils/object/merge";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";
import {lerp} from "../cutscene/lerp";
import {approachLinear, cyclic, lerp as nlerp} from "../utils/math/number";
import {distFromPlayer, getOffsetFromPlayer, hDistFromPlayer, hSignToPlayer} from "../igua/logic/getOffsetFromPlayer";
import {clownDrop, clownHealth, dieClown} from "./utils/clownUtils";
import {player} from "./player";
import {
    ClownHurt,
    SharpBullet, SharpNotice,
    SharpSlamCharge,
    SharpSlamReady,
    SharpStep,
    SharpSwipe,
    SharpSwipeFollowup
} from "../sounds";
import {bouncePlayerOffDisplayObject, knockbackPlayer} from "../igua/bouncePlayer";
import {Force} from "../utils/types/force";
import {getWorldCenter, getWorldPos} from "../igua/gameplay/getCenter";
import {whiten} from "../utils/pixi/whiten";
import {attack, attackRunner} from "./attacks";
import {smallPop} from "./smallPop";
import {moveTowards, Vector, vlerp, vnew} from "../utils/math/vector";
import {Invulnerable} from "../pixins/invulnerable";
import {Stamina} from "../pixins/stamina";
import {wait} from "../cutscene/wait";
import {Dithered} from "../pixins/dithered";
import {empBlast} from "./empBlast";
import {scene} from "../igua/scene";
import {waitHold} from "../cutscene/waitHold";
import {rayToPlayerIntersectsWall} from "../igua/logic/rayIntersectsWall";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {Blinking} from "../pixins/blinking";
import {WeakToSpells} from "../pixins/weakToSpells";

const consts = {
    gravity: 0.2,
    recoveryFrames: 15,
    damage: {
        stab: 60,
        empBlast: 88,
        bullet: 50,
    },
    bullet: {
        speed: 1.33,
        life: 120,
        get travel() {
            return this.life * this.speed - 30;
        }
    }
}

export const resolveClownSharp = resolveGameObject('ClownSharp', x => clownSharp().at(x));

export function clownSharp() {
    const health = clownHealth(440);
    const drop = clownDrop(1, 0.5, 0.3);

    const automation = {
        facePlayer: true,
        lookAtPlayer: true,
        matchBreezeToHspeed: true,
        autoExpression: true,
    };
    const head = newHead();
    const legs = newLegs().at(17, 24);

    const body = container(legs, head);
    body.pivot.set(16, 33);

    const hitbox1 = new Graphics().beginFill(0xff0000).drawRect(7, 10, 17, 12).hide().show(body);
    const hitbox2 = new Graphics().beginFill(0xff0000).drawRect(13, 22, 6, 10).hide().show(body);
    const hitboxes = [ hitbox1, hitbox2 ];

    let timeSinceLastDamage = 100;
    let timeSinceLastArmLift = 100;
    let prevMinArmPose = 1;

    function doAnimation() {
        const minArmPose = Math.min(armr.poseUnit, arml.poseUnit);
        if (minArmPose < prevMinArmPose)
            timeSinceLastArmLift = 0;
        prevMinArmPose = minArmPose;

        head.face.y = timeSinceLastArmLift < 10 ? -1 : 0;

        timeSinceLastArmLift++;

        const off = getOffsetFromPlayer(head);
        const ox = off.normalize().x;
        if (automation.lookAtPlayer)
            head.looking = Math.abs(ox) > 0.3 ? Math.sign(ox) : 0;
        if (automation.facePlayer && ox !== 0)
            head.facing = Math.sign(ox);
        if (automation.matchBreezeToHspeed)
            head.breeze = Math.sign(c.speed.x);
        if (automation.autoExpression) {
            head.shouting = c.speed.y < 0 || timeSinceLastDamage < 20;
            head.angry = timeSinceLastDamage < 25;
        }
        head.x = Math.sin(Math.max(0, 30 - timeSinceLastDamage));
        legs.facing = head.facing;

        legs.splits = c.speed.y < 0;
        if (legs.splits)
            legs.pedometer = 0;
        legs.pedometer += 0.1;
    }

    async function doFacePlayerAnimation() {
        let tfx = 1;
        c.withStep(() => {
            if (automation.lookAtPlayer)
                head.face.x = approachLinear(head.face.x, tfx * head.looking, 0.05);
        });

        while (true) {
            await wait(() => Math.abs(getOffsetFromPlayer(head).x) <= 64);
            tfx = 0;
            await wait(() => Math.abs(getOffsetFromPlayer(head).x) > 72);
            tfx = 1;
        }
    }

    function die() {
        const drop15 = drop(c.vsPlayerHitCount) ? 15 : 0;
        const drop5 = drop(c.vsPlayerHitCount) ? 5 : 0;

        dieClown(c, drop15 + drop5, [0, -10]);
    }

    let tookPhysicalDamage = false;

    function handlePhysicalDamage() {
        if (player.collides(hitboxes) && c.invulnerable <= 0) {
            tookPhysicalDamage = true;
            timeSinceLastDamage = 0;
            ClownHurt.play();

            const phspeed = player.hspeed;
            bouncePlayerOffDisplayObject(hitbox1);
            if (health.damage())
                return die();

            const v = getOffsetFromPlayer(hitbox1).normalize();
            c.speed.x += -1 * Math.sign(v.x);
            if (Math.abs(v.x) > 0.2)
                c.speed.x += Math.min(Math.abs(phspeed * 0.6), 3) * Math.sign(phspeed);
            c.invulnerable = consts.recoveryFrames;
        }

        timeSinceLastDamage++;
    }

    function doPrePhysics() {
        c.speed.x = approachLinear(c.speed.x, 0, 0.2);
    }

    const c = merge(container(body), {})
        .withPixin(Invulnerable())
        .withPixin(Stamina())
        .withPixin(WeakToSpells({ clownHealth: health, spellsHurtbox: hitboxes }))
        .withStep(doAnimation)
        .withStep(handlePhysicalDamage)
        .withStep(doPrePhysics)
        .withGravityAndWallResist([0, -8], 7, consts.gravity)
        .withAsync(doFacePlayerAnimation);

    const attacks = attackRunner().show(c);

    function resetArms(pose = 0) {
        [arml, armr].forEach(x => {
            x.poseUnit = pose;
            x.visible = false;
            x.fork.visible = false;
            x.fork.angle = 0;
            x.fork.expanded = 0;
            x.fork.damage = 0;
            x.fork.glowUnit = 0;
        });
    }

    const armr = newArm().show(c);
    const arml = newArm(false).at(1, 0).show(c);
    const arms = [arml, armr];
    const forks = arms.map(x => x.fork);
    arms.forEach(x => x.damageSource(c));

    let bulletIndex = 0;

    const bullets = attack({ arm: armr, fire: false, delay: 4, step: 0, aim: vnew() })
        .withAsyncOnce(async ({ arm }, self) => {
            self.aim = vnew();
            resetArms(1);
            await Promise.all([
                arm.pose().over(700),
                sleep(200).then(() => arm.fork.reveal().over(400)),
                arm.fork.glow(1).over(500)
            ]);
            self.fire = true;
            tookPhysicalDamage = false;
            await Promise.race([
                wait(() => tookPhysicalDamage).then(() => sleep(100)),
                sleep(2000),
                waitHold(() => distFromPlayer(arm.fork.prongs) > consts.bullet.travel, 60 * 2)
            ]);
            self.fire = false;
            await Promise.all([
                arm.pose(0).over(400),
                arm.fork.reveal(0.5).over(300),
                arm.fork.glow(0).over(200)
            ]);
            resetArms(1);
            await sleep(200);
        })
        .withStep(({ arm, fire, aim }, self) => {
            if (!fire || ++self.step % self.delay)
                return;

            const speed = getOffsetFromPlayer(arm.fork.prongs).normalize();
            if (aim.x === 0 && aim.y === 0)
                aim.at(speed);
            else
                moveTowards(aim, speed, 0.1);
            v.at(aim).normalize();
            vlerp(aim, v, 0.3);
            SharpBullet.play();
            bullet(aim.vcpy().normalize().scale(consts.bullet.speed), consts.bullet.life)
                .tinted(bulletColors[bulletIndex = (bulletIndex + 1) % 2])
                .damageSource(c)
                .at(getWorldPos(arm.fork.prongs))
                .show();
            c.stamina--;
        })

    const stab = attack({ arm: armr })
        .withAsyncOnce(async ({ arm }) => {
            automation.facePlayer = false;
            const sign = arm === armr ? 1 : -1;
            head.facing = sign;

            resetArms(1);
            c.stamina -= 40;
            arm.fork.damage = consts.damage.stab;
            await Promise.all([arm.pose().over(500), sleep(150).then(() => arm.fork.reveal().over(300))])
            SharpSwipe.play();
            c.speed.x = 3 * (arm === armr ? 1 : -1);
            await Promise.all([arm.pose(0).over(120), arm.fork.rotate(90).over(180)]);

            let count = 0;
            while (c.stamina > 0 && hSignToPlayer(c) === sign) {
                await sleep(250);
                c.stamina -= 35;
                arm.fork.expanded = 0.5;
                await Promise.all([
                    arm.pose().over(300),
                    arm.fork.rotate(0).over(300),
                    sleep(100).then(() => arm.fork.reveal().over(200))])
                if (++count > 1) {
                    SharpSwipeFollowup.play();
                    c.speed.y = -2;
                }
                else
                    SharpSwipe.play();
                c.speed.x = 4 * (arm === armr ? 1 : -1);
                await Promise.all([arm.pose(0).over(100), arm.fork.rotate(90).over(140)]);
            }

            await sleep(500);
            resetArms();
        });

    const upCloseSlam = attack({ chargeSoundId: -1 })
        .withAsyncOnce(async (self) => {
            resetArms(1);
            forks.forEach(x => x.visible = true);

            c.speed.y = -0.3;
            c.gravity = 0;

            const raise = arms.flatMap(arm => [
                arm.pose(-0.75).over(1000),
                arm.fork.reveal(0.75).over(1000),
                arm.fork.glow(1).over(1000)
            ]);

            self.chargeSoundId = SharpSlamCharge.play();

            await Promise.all(raise);
            await sleep(250);

            const raise2 = arms.flatMap(arm => [
                arm.pose(-1).over(333),
                arm.fork.reveal(1).over(333)
            ]);

            await Promise.all(raise2);

            await sleep(125);

            SharpSlamReady.play();
            automation.facePlayer = false;

            c.gravity = 0.5;

            const slam = arms.flatMap(arm => [
                arm.pose(1).over(200),
                arm.fork.rotate(90).over(150)
            ]);

            await Promise.all(slam);
            await wait(() => c.isOnGround);
            c.gravity = consts.gravity;
            head.hat.bounce();

            forks.forEach(x => x.glowUnit = 0);
            c.opaqueTint = 0xCD423F;
            const blast = empBlast(80, 0, consts.damage.empBlast, 1000)
                .damageSource(c)
                .at([0, -8].add(c))
                .withStep(() => {
                    if (c.destroyed)
                        blast.destroy();
                })
                .show(scene.gameObjectStage, 0);

            await wait(() => blast.destroyed);
            c.stamina -= 100;
            c.filters = [];
            // @ts-ignore
            delete c.__opaqueTintFilter;
            resetArms();
        })
        .withStep(() => {
            if (hDistFromPlayer(c) > 64 && c.speed.y < 0)
                c.x += hSignToPlayer(c);
        })
        .withCleanup(({ chargeSoundId }) => SharpSlamCharge.stop(chargeSoundId));

    const idle = attack({ noticed: false })
        .withAsync(async (self) => {
            automation.facePlayer = false;
            automation.lookAtPlayer = false;
            head.face.x = 0;
            head.facing = rng.choose([ -1, 1 ]);
            head.looking = head.facing;
            const c = container()
                .withAsync(async () => {
                    while (true) {
                        await sleep(rng.int(1500) + 1000);
                        const looking = head.looking;
                        head.looking = 0;
                        await sleep(100);
                        head.looking = looking === 1 ? -1 : 1;
                    }
                })
                .show(self);
            await wait(() => self.noticed);
            c.destroy();
            automation.facePlayer = true;
            automation.lookAtPlayer = true;
        })
        .withAsync(async (self) => {
            let startUnit = health.unit;
            await Promise.race([
                waitHold(canSeePlayer, 20),
                wait(() => health.unit < startUnit)
            ]);
            self.noticed = true;
            SharpNotice.play();
            c.speed.y = -2;
            await Promise.race([
                wait(() => c.speed.y >= 0)
                    .then(() => wait(() => c.isOnGround)),
                sleep(2000)
            ]);
            self.destroy();
            arms.forEach(x => x.visible = false);
            offscreenForSteps = 0;
        })
        .withStep(({ noticed }) => {
            if (!noticed)
                return;

            arms.forEach(x => {
                x.visible = true;
                x.poseUnit = approachLinear(x.poseUnit, -1, 0.1);
            });
        });

    const pursuePlayer = attack({ waitingForRefill: false, steps: 0 })
        .withStep((self) => {
            automation.facePlayer = false;
            if (self.steps++ >= 60 * 3 && !isOnScreen(c)) {
                offscreenForSteps = 60 * 100;
                return self.destroy();
            }
            if (hDistFromPlayer(c) <= 64)
                return self.destroy();
            if (!rayToPlayerIntersectsWall(getWorldCenter(c)) && c.stamina > 0 && !self.waitingForRefill) {
                c.stamina -= 1;
                head.facing = hSignToPlayer(c) ?? 1;
                c.speed.x = head.facing * 2;
                legs.pedometer += 0.1;
                if (c.isOnGround)
                    c.speed.y = -1.33;
            }
            else if (self.waitingForRefill) {
                if (c.stamina >= 30) {
                    c.stamina = 70 + rng.int(30);
                    self.waitingForRefill = false;
                }
            }
            else if (c.stamina <= 0) {
                self.waitingForRefill = true;
            }
            else
                self.destroy();
        })
        .withAsync(async () => {
            while (true) {
                await wait(() => c.isOnGround);
                await wait(() => c.speed.y < 0);
                // @ts-ignore
                SharpStep.rate(1).play();
                await sleep(40);
                await wait(() => !c.isOnGround);
            }
        })

    function stabTowardsPlayer() {
        return stab({ arm: hSignToPlayer(c) > 0 ? armr : arml });
    }

    let offscreenForSteps = 0;
    c.withStep(() => offscreenForSteps = isOnScreen(c) ? 0 : ++offscreenForSteps)

    async function run(d: DisplayObject) {
        await attacks.run(d);
        automation.lookAtPlayer = true;
        automation.facePlayer = true;
        if (offscreenForSteps > 60 * 3)
            throw new ReturnToIdle();
    }

    function canSeePlayer() {
        return hSignToPlayer(c) === head.looking
            && distFromPlayer(c) < 120
            && isOnScreen(c)
            && !rayToPlayerIntersectsWall(getWorldCenter(c));
    }

    function getFirstAttack(): DisplayObject {
        if (health.hasTakenDamage)
            return stabTowardsPlayer();
        return rng.choose([upCloseSlam, bullets, stabTowardsPlayer])();
    }

    async function doAsImpl() {
        resetArms();
        await run(idle());
        await run(getFirstAttack());
        await run(stabTowardsPlayer());
        while (true) {
            const first = rng.choose([bullets, upCloseSlam]);
            const second = first === bullets ? upCloseSlam : bullets;

            await wait(() => c.stamina > 0);
            if (distFromPlayer(c) < 300)
                await run(first());
            await run(pursuePlayer());
            await run(stabTowardsPlayer());
            if (rng() < 0.67) {
                c.stamina += 100;
                await run(stabTowardsPlayer());
            }
            if (distFromPlayer(c) < 300)
                await run(second());
            if (rng() < 0.67) {
                if (hDistFromPlayer(c) > 96) {
                    await sleep(200);
                    c.stamina += 50 + rng.int(50);
                    await run(pursuePlayer());
                }
                c.stamina += 100;
                await run(stabTowardsPlayer());
            }

            await wait(() => hDistFromPlayer(c) <= 140 || c.stamina >= 30);
            await sleep(80);
        }
    }

    async function doAs() {
        while (true) {
            try {
                await doAsImpl();
            }
            catch (e) {
                if (!(e instanceof ReturnToIdle))
                    throw e;
            }
        }
    }

    setTimeout(() => c.withAsync(doAs));

    c.ext.isHatParent = true;
    return c;
}

class ReturnToIdle { }

const bulletColors = [ 0xFF6DB7, 0xFF3D87 ];

function bullet(speed: Vector, life = 120) {
    const s = Sprite.from(SharpClownBullet)
        .withStep(() => {
            if (life-- <= 0 || s.ext.damageSource.destroyed)
                return s.destroy();
            s.add(speed);
            if (s.collides(player))
                s.damagePlayer(consts.damage.bullet);
        });

    return s;
}

const tailxs = [-1, -1, -1, 1, 1, 1];
const tailx = [ 10, 9, 8, -8, -9, -10 ];

function newLegs() {
    const legs = Sprite.from(legsTxs[0]);
    const tail = Sprite.from(tailTxs[0]).at(-10, -1);

    let tailIndex = rng() * tailTxs.length;
    let facingUnit = 1;

    const c = merge(container(tail, legs), { facing: 1, pedometer: 0, splits: false, tailSpeed: 0.1 })
        .withStep(() => {
            const img = c.splits ? 3 : Math.floor(cyclic(c.pedometer, 0, 3));
            legs.texture = legsTxs[img];
            legs.scale.x = c.facing;
            legs.pivot.x = (Math.sign(c.facing - 1)) + 10;
            legs.pivot.y = img === 2 ? 1 : 0;

            facingUnit = approachLinear(facingUnit, c.facing, 0.1);
            const f = (facingUnit + 1) / 2;
            tail.scale.x = tailxs[Math.floor(nlerp(0, tailxs.length - 1, f))];
            tail.x = tailx[Math.floor(nlerp(0, tailx.length - 1, f))];
            tail.pivot.at(legs.pivot);

            tailIndex += c.tailSpeed;
            tail.texture = tailTxs[Math.floor(cyclic(tailIndex, 0, tailTxs.length))];
        });

    return c;
}

function newHead() {
    const c = merge(container(), { face: vnew(), facing: 1, looking: 0, breeze: 0, angry: false, shouting: false } )
        .withPixin(Blinking());

    const mullet = Sprite.from(headTxs[HeadFrame.Mullet]);
    const head = Sprite.from(headTxs[HeadFrame.Head]);
    const mouth = Sprite.from(headTxs[HeadFrame.Mouth]);
    const hair = Sprite.from(headTxs[HeadFrame.Hair]);
    const eyes = Sprite.from(headTxs[HeadFrame.EyeDefault]).show(c);
    const eyelids = Sprite.from(headTxs[HeadFrame.EyelidsOpen]).show(c);
    const nose = Sprite.from(headTxs[HeadFrame.Nose]);

    const headAndHair = container(mullet, head, hair).show(c, 0);
    const mouthnose = container(mouth, nose).show(c);
    mouthnose.pivot.x = 17;

    const face = [ eyes, eyelids ];

    const theHat = hat(Sprite.from(headTxs[HeadFrame.Hat])).show(c);

    let lastWorldPosY = Force<number>();

    c.withStep(() => {
        const wpy = getWorldPos(c).y;
        if (lastWorldPosY !== undefined) {
            const target = wpy < lastWorldPosY ? 2 : 0;
            mullet.y = approachLinear(mullet.y, target, 0.1);
        }
        lastWorldPosY = wpy;

        mouthnose.scale.x = Math.sign(c.facing) || 1;
        headAndHair.scale.x = mouthnose.scale.x;
        headAndHair.x = Math.sign(headAndHair.scale.x - 1) * -33;
        hair.texture = headTxs[HeadFrame.Hair + Math.sign(Math.round(c.breeze) * c.facing) + 1];
        if (c.angry)
            eyes.texture = headTxs[HeadFrame.EyeAngry];
        else
            eyes.texture = headTxs[HeadFrame.EyeDefault + Math.sign(c.looking) + 1];
        mouth.texture = headTxs[HeadFrame.Mouth + (c.shouting ? 1 : 0)];
        eyelids.texture = headTxs[Math.floor(nlerp(HeadFrame.EyelidsOpen, HeadFrame.EyelidsClosed, c.blink))];
        face.forEach(x => x.at(c.face));
        mouthnose.x = mouthnose.pivot.x + c.face.x;
        mouthnose.y = c.face.y;
    });

    return merge(c, { hat: theHat });
}

function newArm(right = true) {
    const g = new Graphics();

    const fork = newFork();
    const start = [3, -8];
    const end = [11, 0];

    function pose(target = -1) {
        c.visible = true;
        return lerp(c, 'poseUnit').to(target);
    }

    const c = merge(container(g, fork), { poseUnit: 0, fork, pose })
        .withStep(() => {
           end.y = (c.poseUnit < 0 ? 13 * c.poseUnit : 8 * c.poseUnit) + start.y;
           g.clear().lineStyle(2, 0xCD423F).moveTo(start.x, start.y).lineTo(end.x, end.y);
           fork.at(end);
           c.scale.x = right ? 1 : -1;
        });

    return c;
}

function newFork() {
    const s = Sprite.from(forkTxs[0]);
    const hitbox1 = new Graphics().hide().beginFill(0xff0000).drawRect(2, 2, 5, 5);
    const hitbox2 = new Graphics().at(0, 3).hide().beginFill(0xff0000).drawRect(2, 2, 5, 5);
    const hitboxes = [ hitbox1, hitbox2 ];
    let lastVisible = false;

    function reveal(target = 1) {
        c.visible = true;
        return lerp(c, 'expanded').to(target);
    }

    function rotate(angle: number) {
        c.visible = true;
        return lerp(c, 'angle').to(angle);
    }

    function glow(factor: number) {
        return lerp(c, 'glowUnit').to(factor);
    }

    const glowGfx = new Graphics()
        .beginFill(0xFF3D87)
        .drawCircle(0, 0, 10)
        .withStep(() => {
            glowGfx.at(4, nlerp(14, 6, c.expanded));
            glowGfx.dither = c.glowUnit;
        })
        .withPixin(Dithered({ dither: 0 }));
    glowGfx.alpha = 0.75;

    const glowGfxBack = new Graphics()
        .beginFill(0xFF6DB7)
        .drawCircle(0, 0, 14)
        .withStep(() => {
            glowGfxBack.at(glowGfx);
            glowGfxBack.dither = glowGfx.dither - 0.5;
            glowGfxBack.scale.set(Math.max(0.5, glowGfx.dither));
        })
        .withPixin(Dithered({ dither: 0 }));

    const source = { expanded: 0, damage: 0, reveal, rotate, glowUnit: 0, glow, prongs: glowGfx };
    const c = merge(container(glowGfxBack, glowGfx, s, hitbox1, hitbox2), source)
        .withStep(() => {
            if (c.visible && !lastVisible) {
                c.expanded = 0;
                white.factor = 1;
            }
            else if (!c.visible && lastVisible)
                smallPop(8).at(getWorldCenter(pivot));
            lastVisible = c.visible;
            white.factor = Math.max(0, white.factor - 0.067);
            s.texture = forkTxs[Math.floor(nlerp(0, forkTxs.length - 1, c.expanded))];
            if (c.visible && c.expanded >= 0.9 && c.damage > 0 && player.collides(hitboxes)) {
                if (c.damagePlayer(c.damage)) {
                    const knock = v.at(getWorldCenter(hitbox1)).add(getWorldCenter(pivot), -1).normalize().scale(3);
                    knockbackPlayer(knock);
                }
            }
        });

    c.visible = false;
    const white = whiten(c);

    c.pivot.at(-4, -26).scale(-1);
    const pivot = new Graphics().beginFill(0x0000ff).drawRect(c.pivot.x, c.pivot.y, 1, 1).hide().show(c);

    return c;
}

const v = vnew();

const forkTxs = subimageTextures(SharpClownFork, { width: 10 });

const headTxs = subimageTextures(SharpClownHead, { width: 30 });

enum HeadFrame {
    Mullet = 0,
    Head = 1,
    Mouth = 2,
    Hair = 4,
    EyeAngry = 7,
    EyeDefault = 8,
    EyelidsOpen = 11,
    EyelidsClosed = 15,
    Nose = 16,
    Hat = 17,
}

const legsTxs = subimageTextures(SharpClownLegs, { width: 20 });
const tailTxs = subimageTextures(SharpClownTail, { width: 20 });