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
import {getOffsetFromPlayer} from "../igua/logic/getOffsetFromPlayer";
import {clownDrop, clownHealth, dieClown} from "./utils/clownUtils";
import {player} from "./player";
import {ClownHurt} from "../sounds";
import {bouncePlayerOffDisplayObject} from "../igua/bouncePlayer";
import {Force} from "../utils/types/force";
import {getWorldCenter, getWorldPos} from "../igua/gameplay/getCenter";
import {whiten} from "../utils/pixi/whiten";
import {attack, attackRunner} from "./attacks";
import {smallPop} from "./smallPop";

export function clownSharp() {
    const health = clownHealth(450);
    const drop = clownDrop(1, 0.5, 0.3);

    const consts = {
        recoveryFrames: 15,
    }

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
    let invulnerable = -1;
    let timeSinceLastDamage = 100;

    function doAnimation() {
        const ox = getOffsetFromPlayer(head).normalize().x;
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
        legs.pedometer += 0.1;
    }

    function die() {
        const dropFifteen = drop(c.vsPlayerHitCount);
        dieClown(c, dropFifteen && 15, [0, -16]);
    }

    function handleDamage() {
        if (player.collides(hitboxes) && invulnerable <= 0) {
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
            invulnerable = consts.recoveryFrames;
        }

        c.visible = invulnerable > 0 ? !c.visible : true;
        invulnerable--;
        timeSinceLastDamage++;
    }

    function doPrePhysics() {
        c.speed.x = approachLinear(c.speed.x, 0, 0.2);
    }

    const c = merge(container(body), {})
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
        });
    }

    const armr = newArm().show(c);
    const arml = newArm(false).at(1, 0).show(c);

    const stab = attack({ arm: armr })
        .withAsyncOnce(async ({ arm }) => {
            resetArms(1);
            await Promise.all([arm.pose().over(700), sleep(200).then(() => arm.fork.reveal().over(400))])
            c.speed.x = 3 * (arm === armr ? 1 : -1);
            await Promise.all([arm.pose(0.2).over(120), arm.fork.rotate(90).over(180)]);
            await sleep(500);
        });

    function stabTowardsPlayer() {
        return stab({ arm: getOffsetFromPlayer(c).x > 0 ? armr : arml });
    }

    async function doAs() {
        while (true) {
            await attacks.run(stabTowardsPlayer());
            await sleep(1000);
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
    const c = merge(container(), { facing: 1, looking: 0, breeze: 0, angry: false, shouting: false, blinkUnit: 0 } )
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
    const face = container(mouth, nose).show(c);
    face.pivot.x = 17;
    face.x = face.pivot.x;

    hat(Sprite.from(headTxs[HeadFrame.Hat])).show(c);

    let lastWorldPosY = Force<number>();

    c.withStep(() => {
        const wpy = getWorldPos(c).y;
        if (lastWorldPosY !== undefined) {
            const target = wpy < lastWorldPosY ? 2 : 0;
            mullet.y = approachLinear(mullet.y, target, 0.1);
        }
        lastWorldPosY = wpy;

        face.scale.x = Math.sign(c.facing) || 1;
        headAndHair.scale.x = face.scale.x;
        headAndHair.x = Math.sign(headAndHair.scale.x - 1) * -33;
        hair.texture = headTxs[HeadFrame.Hair + Math.sign(Math.round(c.breeze) * c.facing) + 1];
        if (c.angry)
            eyes.texture = headTxs[HeadFrame.EyeAngry];
        else
            eyes.texture = headTxs[HeadFrame.EyeDefault + Math.sign(c.looking) + 1];
        mouth.texture = headTxs[HeadFrame.Mouth + (c.shouting ? 1 : 0)];
        eyelids.texture = headTxs[Math.floor(nlerp(HeadFrame.EyelidsOpen, HeadFrame.EyelidsClosed, c.blinkUnit))];
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

    const c = merge(container(s, hitbox1, hitbox2), { expanded: 0, damage: 20, reveal, rotate })
        .withStep(() => {
            const xscale = c.worldTransform.a;
            if (c.visible && !lastVisible) {
                c.expanded = 0;
                white.factor = 1;
            }
            else if (!c.visible && lastVisible)
                smallPop(12).at(getWorldCenter(c));
            lastVisible = c.visible;
            white.factor = Math.max(0, white.factor - 0.067);
            s.texture = forkTxs[Math.floor(nlerp(0, forkTxs.length - 1, c.expanded))];
            if (c.visible && c.expanded >= 0.9 && c.damage > 0 && player.collides(hitboxes))
                c.damagePlayer(c.damage);
        });
    const white = whiten(c);

    c.pivot.at(-4, -26).scale(-1);

    return c;
}

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