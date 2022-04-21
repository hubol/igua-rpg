import {ClownExplode} from "../../sounds";
import {valuable} from "../valuable";
import {confetti} from "../confetti";
import {DisplayObject} from "pixi.js";
import {player} from "../player";
import {SceneLocal} from "../../igua/sceneLocal";
import {container} from "../../utils/pixi/container";
import {merge} from "../../utils/merge";
import {Undefined} from "../../utils/undefined";

export function dieClown(container: DisplayObject, drop: boolean) {
    ClownExplode.play();
    if (drop)
        valuable(container.x, container.y, undefined, "ValuableOrange")
            .delayCollectible()
            .show();

    confetti().at(container).show();
    container.destroy();
}

export function clownHealth(maxHealth: number) {
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