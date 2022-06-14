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
import {vnew} from "../../utils/math/vector";
import {progress} from "../../igua/data/progress";

export function dieClown(container: DisplayObject, drop: boolean | number, offset = vnew()) {
    ClownExplode.play();
    if (drop)
        valuable(container.x + offset.x, container.y + offset.y, undefined, drop === 15 ? "ValuableBlue" : "ValuableOrange")
            .delayCollectible()
            .show();

    confetti().at(offset.add(container)).show();
    container.destroy();
}

export function clownHealth(maxHealth: number) {
    maxHealth *= 1 + progress.newGamePlus;

    return {
        maxHealth,
        health: maxHealth,
        get unit() {
            return this.health / maxHealth;
        },
        get nearDeath() {
            return this.health < maxHealth && this.health <= player.strength;
        },
        get isDead() {
            return this.health <= 0;
        },
        damage(factor = player.strength) {
            this.health = Math.max(0, this.health - factor);
            clownHealthUi.value.clownHealth = this;
            return this.isDead;
        }
    };
}

export function clownDrop(initialRate: number, deltaRate: number, minRate: number) {
    return (count: number) => rng() <= Math.max(minRate, initialRate - Math.abs(deltaRate) * count);
}

type ClownHealth = ReturnType<typeof clownHealth>;

export const clownHealthUi = new SceneLocal(() => {
    let clownHealth = Undefined<ClownHealth>();
    let show = 0;

    return merge(container(), {
            get clownHealth() {
                return clownHealth;
            },
            set clownHealth(c) {
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
        .show();
})