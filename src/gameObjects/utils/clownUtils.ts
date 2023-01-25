import {ClownExplode} from "../../sounds";
import {valuable} from "../valuable";
import {confetti} from "../confetti";
import {DisplayObject} from "pixi.js";
import {player} from "../player";
import {SceneLocal} from "../../igua/sceneLocal";
import {container} from "../../utils/pixi/container";
import {merge} from "../../utils/object/merge";
import {Undefined} from "../../utils/types/undefined";
import {rng} from "../../utils/math/rng";
import {Vector, vnew} from "../../utils/math/vector";
import {progress} from "../../igua/data/progress";
import {wait} from "../../cutscene/wait";
import {derivedStats} from "../../igua/gameplay/derivedStats";

const v = vnew();

export function dieClown(container: DisplayObject, drop: boolean | number, offset = vnew()) {
    ClownExplode.play();

    if (drop)
        clownDropSpawn(v.at(offset).add(container), drop as number);

    confetti().at(offset.add(container)).show();
    container.destroy();
}

function clownDropSpawn(vec: Vector, drop: number) {
    const bottom = drop < 15 ? 5 : 15;
    const top = drop - bottom;
    const both = top >= 5;

    if (both)
        vec.y += 8;

    showValuable(vec, bottom);

    if (!both)
        return;

    vec.y -= 15;
    showValuable(vec, top);
}

function showValuable(vec: Vector, value: number) {
    return valuable(vec.x, vec.y, undefined, value === 15 ? 'ValuableBlue' : 'ValuableOrange')
        .delayCollectible()
        .show();
}

export function clownHealth(maxHealth: number) {
    maxHealth *= 1 + progress.newGamePlus;

    return {
        maxHealth,
        health: maxHealth,
        spellDamageTaken: 0,
        get hasTakenEnoughSpellDamageToBePermanentlyDefeated() {
            return this.spellDamageTaken >= (derivedStats.spellPower - 1) * 3;
        },
        get unit() {
            return this.health / maxHealth;
        },
        get hasTakenDamage() {
            return this.unit < 1;
        },
        get nearDeath() {
            return this.health < maxHealth && this.health <= player.strength;
        },
        get isDead() {
            return this.health <= 0;
        },
        damage(factor = player.strength) {
            clownHealthUi.value.clownHealth = this;
            this.health = Math.max(0, this.health - factor);
            return this.isDead;
        },
        tookDamage() {
            const prev = this.health;
            return wait(() => this.health < prev);
        }
    };
}

export function clownDrop(initialRate: number, deltaRate: number, minRate: number) {
    return (count: number) => rng() <= Math.max(minRate, initialRate - Math.abs(deltaRate) * count);
}

export type ClownHealth = ReturnType<typeof clownHealth>;

export const clownHealthUi = new SceneLocal(() => {
    let clownHealth = Undefined<ClownHealth>();
    let show = 0;
    let initialHealth = -1;

    return merge(container(), {
            get damageTaken() {
                return initialHealth === -1 || !this.clownHealth ? 0 : initialHealth - this.clownHealth.health;
            },
            get clownHealth() {
                return clownHealth;
            },
            set clownHealth(c) {
                if (c && clownHealth !== c)
                    initialHealth = c.health;
                if (c && (!c.isDead || clownHealth === c))
                    show = 60;
                clownHealth = c;
            }
        })
        .withStep(() => {
            show--;
            if (show <= 0)
                clownHealth = undefined;
        })
        .on('removed', () => clownHealth = undefined)
        .show();
})