import {Graphics, Sprite} from "pixi.js";
import {ClownSpikeBall} from "../textures";
import {player} from "./player";
import {merge} from "../utils/object/merge";
import {vnew} from "../utils/math/vector";
import { VileSpikeLand } from "../sounds";
import {scene} from "../igua/scene";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {getTouchedSolidNormal} from "./walls";

const grav = 0.25;

export function spikeBounce(damage = 50) {
    let bounced = false;
    const s = merge(Sprite.from(ClownSpikeBall), { speed: vnew() }).withStep(() => {
        if (mask.collides(player))
            player.damage(damage);

        s.speed.y = Math.min(s.speed.y, 4);
        s.add(s.speed);
        s.speed.y += grav;

        if (!bounced) {
            const normal = getTouchedSolidNormal(s, 5);
            const hitGround = normal && normal.y < 0;

            if (hitGround) {
                bounced = true;
                s.speed.y = -s.speed.y * 0.8;
                if (isOnScreen(s))
                    VileSpikeLand.play();
            }
        }
        else {
            if (s.y >= scene.height + 64)
                s.destroy();
        }
    })
    .centerAnchor();

    const mask = new Graphics().beginFill(0xff0000).drawRect(-5, -4, 9, 9).show(s).hide();

    return s;
}