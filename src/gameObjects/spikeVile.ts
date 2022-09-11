import {Graphics, Sprite} from "pixi.js";
import {ClownSpikeBall} from "../textures";
import {player} from "./player";
import {merge} from "../utils/object/merge";
import {Vector, vnew} from "../utils/math/vector";
import {newGravity} from "./utils/newGravity";
import {approachLinear} from "../utils/math/number";
import {getWorldPos} from "../igua/gameplay/getCenter";
import {now} from "../utils/now";

const grav = 0.25;

export function spikeVile(damage = 35) {
    let life = 60 * 6;
    const s = merge(Sprite.from(ClownSpikeBall), { speed: vnew() }).withStep(() => {
        if (mask.collides(player))
            player.damage(damage);
        const r = gravity(grav);
        if (r.isOnGround)
            s.speed.x = approachLinear(s.speed.x, 0, 1);
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

const v = vnew();

const rainbow = [0xD0D020, 0x8FAF1C];

export function spikeVilePreview(speed: Vector) {
    let maxSteps = 0;
    const g = merge(new Graphics(), { end: vnew() })
        .withStep(() => {
            maxSteps += 4;
            simSpeed.at(speed);
            g.clear();
            const gv = v.at(getWorldPos(g));
            simPos.at(gv);
            let yprev = 0;
            for (let i = 0; i < 60 * 4; i++) {
                g.lineStyle(1, rainbow[Math.floor(i + now.s * 16) % 2]);
                const r = gravity(grav);
                const y = simPos.y - v.y;
                if ((!r.isOnGround || Math.abs(y - yprev) > 3) && i < maxSteps)
                    g.lineTo(simPos.x - v.x, y);
                yprev = y;
                if (r.isOnGround)
                    break;
            }
            g.end.at(simPos);
        })

    const simSpeed = vnew();
    const simPos = vnew();

    const gravity = newGravity(simPos as any, simSpeed, vnew(), 5);
    return g;
}