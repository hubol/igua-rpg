import {Graphics, Sprite} from "pixi.js";
import {ClownSpikeBall} from "../textures";
import {player} from "./player";
import {merge} from "../utils/object/merge";
import {vnew} from "../utils/math/vector";
import {newGravity} from "./utils/newGravity";
import {approachLinear} from "../utils/math/number";

export function spikeVile(damage = 35) {
    let life = 60 * 6;
    const s = merge(Sprite.from(ClownSpikeBall), { speed: vnew() }).withStep(() => {
        if (mask.collides(player))
            player.damage(damage);
        const r = gravity(0.25);
        if (r.isOnGround)
            s.speed.x = approachLinear(s.speed.x, 0, 0.3);
        life--;
        if (life < 30)
            s.visible = !s.visible;
        if (life <= 0)
            s.destroy();
    })
    .centerAnchor();

    const mask = new Graphics().beginFill(0xff0000).drawRect(-5, -4, 9, 9).show(s).hide();

    const gravity = newGravity(s, s.speed, vnew(), 5);

    return s;
}