import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {LaughSpell} from "../textures";
import {DisplayObject, Graphics} from "pixi.js";
import {animatedSprite} from "../igua/animatedSprite";
import {container} from "../utils/pixi/container";
import {Dithered} from "../pixins/dithered";
import {lerp} from "../cutscene/lerp";
import {wait} from "../cutscene/wait";
import {Undefined} from "../utils/types/undefined";
import {WeakToSpellsInstance, WeakToSpellsInstances} from "../pixins/weakToSpells";
import {distance, vnew} from "../utils/math/vector";
import {getWorldBounds, getWorldCenter} from "../igua/gameplay/getCenter";
import {derivedStats} from "../igua/gameplay/derivedStats";
import {rng} from "../utils/math/rng";
import {player} from "./player";
import {scene} from "../igua/scene";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {CastSpellCast, CastSpellCharge, CastSpellDamage, CastSpellHit} from "../sounds";
import {sleep} from "../cutscene/sleep";
import {approachLinear} from "../utils/math/number";
import {IguanaPuppet} from "../igua/puppet/iguanaPuppet";

export enum PlayerSpellColor {
    Dark = 0x208050,
    Light = 0x60C850,
}

const txs = subimageTextures(LaughSpell, 2);

export function castPlayerSpell(subject: IguanaPuppet = player) {
    const c = container()
        .withAsync(async () => {
            subject.headLiftUnit = 1;
            for (let i = 0; i < 3; i++) {
                // @ts-ignore
                const mouth = player.head.children[1].children[1];
                const xscale = player.scale.x * player.children[0].scale.x;
                playerSpell(subject).at(getWorldCenter(mouth).add(xscale * 8, 0)).ahead();
                await sleep(300 * derivedStats.badge.lungCastTimeScale);
            }
            subject.headLiftUnit = 0;
            c.destroy();
        })
        .show();
}

const consts = {
    speedStart: 2.5,
    speedDelta: 0.05,
    speedEnd: 1.25,
    maximumTravelTimeFrames: 3 * 60,
}

function playerSpell(subject: IguanaPuppet) {
    CastSpellCharge.play();
    const hitbox = new Graphics().beginFill().drawRect(1, 1, 11, 8).hide();
    const sprite = animatedSprite(txs, 0.025 + rng() * 0.025);
    sprite.imageIndex = rng() * 2;

    let slowRise = false;
    let active = false;
    let activeSteps = 0;
    let target = Undefined<WeakToSpellsInstance>();
    let targetHurtbox = Undefined<DisplayObject>();
    let targetOffset = vnew();
    let moveTowardsTargetSpeed = consts.speedStart;

    const s = scene.s;

    const spell = container(sprite, hitbox)
        .withPixin(Dithered({ dither: 0 }))
        .withStep(() => {
            if (slowRise)
                spell.y -= 1;
            if (active) {
                activeSteps += 1;
                if (!target || target.destroyed) {
                    const result = findClosestWeakToSpellsInstance(spell);
                    target = result.instance;
                    targetHurtbox = result.hurtbox;
                    targetOffset.at(result.targetOffset);
                }
                if (target && targetHurtbox) {
                    const box = getWorldBounds(targetHurtbox);
                    const dst = v1.at(box.add(targetOffset));
                    spell.moveTowards(dst, moveTowardsTargetSpeed);
                    moveTowardsTargetSpeed = approachLinear(moveTowardsTargetSpeed, consts.speedEnd, consts.speedDelta);
                    targetOffset.x = approachLinear(targetOffset.x, box.width / 2, 0.25);
                    targetOffset.y = approachLinear(targetOffset.y, box.height / 2, 0.25);
                }
                else {
                    spell.x += Math.sin((scene.s - s) * Math.PI * 2);
                    spell.y -= 0.3;
                }
                if (doSpellCollisionEvents(hitbox)) {
                    active = false;
                }
            }
            if (activeSteps >= consts.maximumTravelTimeFrames * derivedStats.badge.lungCastDistanceScale)
                active = false;
        })
        .withAsync(async () => {
            await sleep(100)
            await lerp(subject, 'agapeUnit').to(1).over(100);
            await sleep(50);
            await lerp(subject, 'agapeUnit').to(0).over(100);
        })
        .withAsync(async () => {
            slowRise = true;
            await lerp(spell, 'dither').to(1).over(250);
            CastSpellCast.play();
            slowRise = false;
            active = true;
            await wait(() => !active);
            CastSpellHit.play();
            await lerp(spell, 'dither').to(0).over(250);
            spell.destroy();
        });

    spell.pivot.set(7, 5);

    return spell;
}

function doOneSpellCollision(instance: WeakToSpellsInstance) {
    CastSpellDamage.play();
    const min = Math.max(0, instance.clownHealth.health - 1);
    instance.clownHealth.damage(Math.min(derivedStats.spellPower, min));
    instance.clownHealth.spellDamageTaken += derivedStats.spellPower;
    instance.showSpellEffectTimeFrames = 3;
}

function doSpellCollisionEvents(spellHitbox :DisplayObject) {
    const instances = WeakToSpellsInstances.value;
    let didCollide = false;

    for (const instance of instances) {
        for (const hurtbox of instance.spellsHurtbox) {
            if (hurtbox.collides(spellHitbox)) {
                doOneSpellCollision(instance);
                didCollide = true;
                break;
            }
        }
    }

    return didCollide;
}

const v1 = vnew();
const v2 = vnew();
const v3 = vnew();

const result = {
    instance: Undefined<WeakToSpellsInstance>(),
    hurtbox: Undefined<DisplayObject>(),
    targetOffset: vnew(),
}

export function findClosestWeakToSpellsInstance(source: DisplayObject) {
    const vector = v2.at(getWorldCenter(source));

    let closestInstance = Undefined<WeakToSpellsInstance>();
    let closestHurtbox = Undefined<DisplayObject>();
    let closestTarget = v3.at(vector);
    let shortestDistance = Number.MAX_VALUE;

    const instances = WeakToSpellsInstances.value;

    for (const instance of instances) {
        if (!isOnScreen(instance))
            continue;
        for (const hurtbox of instance.spellsHurtbox) {
            const rectangle = getWorldBounds(hurtbox);

            const vx = Math.max(rectangle.x, Math.min(vector.x, rectangle.x + rectangle.width));
            const vy = Math.max(rectangle.y, Math.min(vector.y, rectangle.y + rectangle.height));

            const topDistance = distance(vector, v1.at(vx, rectangle.y));
            if (topDistance < shortestDistance) {
                shortestDistance = topDistance;
                closestTarget.at(v1);
                closestInstance = instance;
                closestHurtbox = hurtbox;
            }
            const bottomDistance = distance(vector, v1.at(vx, rectangle.y + rectangle.height));
            if (bottomDistance < shortestDistance) {
                shortestDistance = bottomDistance;
                closestTarget.at(v1);
                closestInstance = instance;
                closestHurtbox = hurtbox;
            }
            const leftDistance = distance(vector, v1.at(rectangle.x, vy));
            if (leftDistance < shortestDistance) {
                shortestDistance = leftDistance;
                closestTarget.at(v1);
                closestInstance = instance;
                closestHurtbox = hurtbox;
            }
            const rightDistance = distance(vector, v1.at(rectangle.x + rectangle.width, vy));
            if (rightDistance < shortestDistance) {
                shortestDistance = rightDistance;
                closestTarget.at(v1);
                closestInstance = instance;
                closestHurtbox = hurtbox;
            }
        }
    }

    result.instance = closestInstance;
    result.hurtbox = closestHurtbox;
    if (closestHurtbox) {
        result.targetOffset.at(closestTarget).add(getWorldBounds(closestHurtbox), -1);
    }

    return result;
}