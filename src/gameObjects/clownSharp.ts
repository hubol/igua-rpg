import {SharpClownFork, SharpClownHead, SharpClownLegs, SharpClownTail} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Graphics, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {hat} from "./hat";
import {merge} from "../utils/object/merge";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";
import {lerp} from "../cutscene/lerp";
import {approachLinear, cyclic, lerp as nlerp} from "../utils/math/number";
import {getOffsetFromPlayer, hSignToPlayer} from "../igua/logic/getOffsetFromPlayer";
import {clownDrop, clownHealth, dieClown} from "./utils/clownUtils";
import {player} from "./player";
import {ClownHurt} from "../sounds";
import {bouncePlayerOffDisplayObject, knockbackPlayer} from "../igua/bouncePlayer";
import {Force} from "../utils/types/force";
import {getWorldCenter, getWorldPos} from "../igua/gameplay/getCenter";
import {whiten} from "../utils/pixi/whiten";
import {attack, attackRunner} from "./attacks";
import {smallPop} from "./smallPop";
import {vnew} from "../utils/math/vector";
import {Invulnerable} from "../pixins/invulnerable";
import {Stamina} from "../pixins/stamina";
import {wait} from "../cutscene/wait";

const consts = {
    recoveryFrames: 15,
    damage: {
        stab: 50,
    }
}

export function clownSharp() {
    const health = clownHealth(450);
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
        const rox = off.x;
        const ox = off.normalize().x;
        if (automation.lookAtPlayer) {
            head.looking = Math.abs(ox) > 0.3 ? Math.sign(ox) : 0;
            const tfx = Math.abs(rox) > 64 ? head.looking : 0;
            head.face.x = approachLinear(head.face.x, tfx, 0.05);
        }
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
        legs.pedometer += 0.1;
    }

    function die() {
        const dropFifteen = drop(c.vsPlayerHitCount);
        dieClown(c, dropFifteen && 15, [0, -10]);
    }

    function handleDamage() {
        if (player.collides(hitboxes) && c.invulnerable <= 0) {
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
        .withStep(doAnimation)
        .withStep(handleDamage)
        .withStep(doPrePhysics)
        .withGravityAndWallResist([0, -8], 7, 0.2);

    const attacks = attackRunner().show(c);

    function resetArms(pose = 0) {
        [arml, armr].forEach(x => {
            x.poseUnit = pose;
            x.visible = false;
            x.fork.visible = false;
            x.fork.angle = 0;
            x.fork.expanded = 0;
            x.fork.damage = 0;
        });
    }

    const armr = newArm().show(c);
    const arml = newArm(false).at(1, 0).show(c);
    [armr, arml].forEach(x => x.damageSource(c));

    const stab = attack({ arm: armr })
        .withAsyncOnce(async ({ arm }) => {
            const sign = arm === armr ? 1 : -1;

            resetArms(1);
            c.stamina -= 40;
            arm.fork.damage = consts.damage.stab;
            await Promise.all([arm.pose().over(700), sleep(200).then(() => arm.fork.reveal().over(400))])
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
                if (++count > 1)
                    c.speed.y = -2;
                c.speed.x = 4 * (arm === armr ? 1 : -1);
                await Promise.all([arm.pose(0).over(100), arm.fork.rotate(90).over(140)]);
            }

            await sleep(500);
        });

    function stabTowardsPlayer() {
        return stab({ arm: hSignToPlayer(c) > 0 ? armr : arml });
    }

    async function doAs() {
        while (true) {
            await wait(() => c.stamina > 0);
            await attacks.run(stabTowardsPlayer());
        }
    }

    setTimeout(() => c.withAsync(doAs));

    c.ext.isHatParent = true;
    return c;
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
    const c = merge(container(), { face: vnew(), facing: 1, looking: 0, breeze: 0, angry: false, shouting: false, blinkUnit: 0 } )
        .withAsync(async () => {
            await sleep(500 + rng.int(500));
            while (true) {
                await lerp(c, 'blinkUnit').to(1).over(100);
                await sleep(60);
                await lerp(c, 'blinkUnit').to(0).over(100);
                await sleep(300 + rng.int(3000));
            }
        });

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

    hat(Sprite.from(headTxs[HeadFrame.Hat])).show(c);

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
        eyelids.texture = headTxs[Math.floor(nlerp(HeadFrame.EyelidsOpen, HeadFrame.EyelidsClosed, c.blinkUnit))];
        face.forEach(x => x.at(c.face));
        mouthnose.x = mouthnose.pivot.x + c.face.x;
        mouthnose.y = c.face.y;
    });

    return c;
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

    function reveal() {
        c.visible = true;
        return lerp(c, 'expanded').to(1);
    }

    function rotate(angle: number) {
        c.visible = true;
        return lerp(c, 'angle').to(angle);
    }

    const c = merge(container(s, hitbox1, hitbox2), { expanded: 0, damage: 0, reveal, rotate })
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