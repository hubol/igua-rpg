import {Undefined} from "../utils/types/undefined";
import {DisplayObject, Sprite} from "pixi.js";
import {OrnateClownSpikeBall} from "../textures";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {merge} from "../utils/object/merge";
import {vnew} from "../utils/math/vector";
import {container} from "../utils/pixi/container";
import {Hbox} from "./hbox";

function spikeBall(damageValue: number, follow = Undefined<DisplayObject>()) {
    const hitbox = new Hbox(5, 4, 15, 17);
    const c = merge(container(Sprite.from(OrnateClownSpikeBall), hitbox), { knockback: vnew(), framesUntilDangerous: 0 })
        .withStep(() => {
            if (follow && !follow.destroyed)
                c.at(getWorldCenter(follow));
            c.alpha = c.framesUntilDangerous > 1 ? 0.5 : 1;
            if (c.framesUntilDangerous > 0) {
                c.framesUntilDangerous--;
                return;
            }

            if (player.collides(c)) {
                c.damagePlayer(damageValue);
                player.engine.knockback.x = c.knockback.x;
            }
        });
    c.pivot.set(13, 13);

    return c;
}

export const ornateProjectile = {
    spikeBall
};