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
import {vnew} from "../utils/math/vector";
import {getWorldBounds, getWorldCenter} from "../igua/gameplay/getCenter";
import {derivedStats} from "../igua/gameplay/derivedStats";
import {smallPop} from "./smallPop";
import {rng} from "../utils/math/rng";
import {player} from "./player";
import {scene} from "../igua/scene";
import {isOnScreen} from "../igua/logic/isOnScreen";

const txs = subimageTextures(LaughSpell, 2);

export function castPlayerSpell() {
    // TODO sfx
    // @ts-ignore
    playerSpell().at(getWorldCenter(player.head.children[1])).ahead();
}

function playerSpell() {
    const hitbox = new Graphics().beginFill().drawRect(1, 1, 11, 8).hide();
    const sprite = animatedSprite(txs, 0.025 + rng() * 0.025);
    sprite.imageIndex = rng() * 2;

    let slowRise = false;
    let active = false;
    let activeSteps = 0;
    let target = Undefined<WeakToSpellsInstance>();
    let targetHurtbox = Undefined<DisplayObject>();

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
                    target = result[0];
                    targetHurtbox = result[1];
                }
                if (target && targetHurtbox) {
                    spell.moveTowards(getWorldCenter(targetHurtbox), 1);
                }
                else {
                    spell.x += Math.sin((scene.s - s) * Math.PI * 2);
                    spell.y -= 0.3;
                }
                if (doSpellCollisionEvents(spell)) {
                    // TODO sfx
                    // smallPop(12, spell.parent).at(spell);
                    // spell.destroy();
                    active = false;
                }
            }
            if (activeSteps >= 60 * 5)
                active = false;
        })
        .withAsync(async () => {
            slowRise = true;
            await lerp(spell, 'dither').to(1).over(250);
            slowRise = false;
            active = true;
            await wait(() => !active);
            await lerp(spell, 'dither').to(0).over(250);
            spell.destroy();
        });

    spell.pivot.set(7, 5);

    return spell;
}

function doOneSpellCollision(instance: WeakToSpellsInstance) {
    const min = Math.max(0, instance.clownHealth.health - 1);
    instance.clownHealth.damage(Math.min(derivedStats.spellPower, min));
}

function doSpellCollisionEvents(spell :DisplayObject) {
    const instances = WeakToSpellsInstances.value;
    let didCollide = false;

    for (const instance of instances) {
        for (const hurtbox of instance.spellsHurtbox) {
            if (hurtbox.collides(spell)) {
                doOneSpellCollision(instance);
                didCollide = true;
                break;
            }
        }
    }

    return didCollide;
}

const v = vnew();

const closest: [WeakToSpellsInstance | undefined, DisplayObject | undefined] = [] as any;

function findClosestWeakToSpellsInstance(source: DisplayObject) {
    const instances = WeakToSpellsInstances.value;
    let closestInstance = Undefined<WeakToSpellsInstance>();
    let closestHurtbox = Undefined<DisplayObject>();
    let closestDistance = Number.MAX_VALUE;

    const sourcepos = v.at(getWorldCenter(source));

    for (const instance of instances) {
        if (!isOnScreen(instance))
            continue;
        for (const hurtbox of instance.spellsHurtbox) {
            const bounds = getWorldBounds(hurtbox);
            const radius = (bounds.width + bounds.height) / 2;
            const distance = getWorldCenter(hurtbox).add(sourcepos, -1).vlength - radius;
            if (distance < closestDistance) {
                closestHurtbox = hurtbox;
                closestInstance = instance;
                closestDistance = distance;
            }
        }
    }

    closest[0] = closestInstance;
    closest[1] = closestHurtbox;

    return closest;
}