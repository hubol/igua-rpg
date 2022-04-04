import {ClownExplode} from "../../sounds";
import {valuable} from "../valuable";
import {confetti} from "../confetti";
import {DisplayObject} from "pixi.js";

export function dieClown(container: DisplayObject, drop: boolean) {
    ClownExplode.play();
    if (drop)
        valuable(container.x, container.y, undefined, "ValuableOrange")
            .delayCollectible()
            .show();

    confetti().at(container).show();
    container.destroy();
}