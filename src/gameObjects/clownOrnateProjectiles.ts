import {Undefined} from "../utils/types/undefined";
import {DisplayObject, Sprite} from "pixi.js";
import {OrnateClownSpikeBall} from "../textures";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {merge} from "../utils/object/merge";
import {vnew} from "../utils/math/vector";
import {container} from "../utils/pixi/container";
import {Hbox} from "./hbox";
import {waitHold} from "../cutscene/waitHold";
import {whiten} from "../utils/pixi/whiten";
import {lerp} from "../cutscene/lerp";
import {poisonBombExplosion} from "./poisonBomb";
import {wait} from "../cutscene/wait";

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

            if (player.collides(hitbox)) {
                c.damagePlayer(damageValue);
                player.engine.knockback.x = c.knockback.x;
            }
        });
    c.pivot.set(13, 13);

    return c;
}

function bowledSpikeBall(damageValue: number) {
    const hitbox = new Hbox(5, 4, 15, 17);
    const s = Sprite.from(OrnateClownSpikeBall).centerAnchor().at(13, 13);

    let _angle = 0;

    const c = container(s, hitbox)
        .withGravityAndWallResist(vnew(), 10, 0.7)
        .withStep(() => {
            _angle += c.speed.x;
            s.angle = Math.round(_angle / 20) * 20;
            if (player.collides(hitbox)) {
                c.damagePlayer(damageValue);
                const knockBackFromMotion = Math.sign(c.speed.x) * 3;
                if (knockBackFromMotion !== 0)
                    player.engine.knockback.x = knockBackFromMotion;
            }
        })
        .withAsync(async () => {
            await wait(() => c.isOnGround);
            // TODO SFX thud
        })
        .withAsync(async () => {
            await waitHold(() => c.speed.x === 0, 2);
            const w = whiten(s);
            // TODO sfx charge?
            await lerp(w, 'factor').to(1).over(250);
            poisonBombExplosion().at(c).show(c.parent);
            c.destroy();
        });
    c.pivot.set(13, 13);

    return c;
}

export const ornateProjectile = {
    spikeBall,
    bowledSpikeBall,
};