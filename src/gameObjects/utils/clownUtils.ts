import {ClownExplode} from "../../sounds";
import {valuable} from "../valuable";
import {confetti} from "../confetti";
import {DisplayObject} from "pixi.js";
import {player} from "../player";

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
            return this.isDead;
        }
    };
}