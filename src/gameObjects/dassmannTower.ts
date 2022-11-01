import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {DassmannTower} from "../textures";
import {container} from "../utils/pixi/container";
import {whiten} from "../utils/pixi/whiten";
import {lerp} from "../cutscene/lerp";
import {clownHealth} from "./utils/clownUtils";
import {Invulnerable} from "../pixins/invulnerable";
import {wait} from "../cutscene/wait";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {resolveBlock} from "./walls";
import {player} from "./player";
import {vnew} from "../utils/math/vector";
import {ClownExplode, ClownHurt} from "../sounds";
import {confetti} from "./confetti";

const v = vnew();

export function dassmannTower() {
    const health = clownHealth(200);

    const c = container()
        .withPixin(Invulnerable());

    c.pivot.set(10, 225);
    const s = Sprite.from(DassmannTower).show(c);
    const mask = new Graphics().beginFill(0xff0000).drawRect(2, 2, 16, 224).hide().show(c);
    const stencil = new Graphics().beginFill(0xffffff).drawRect(0, 0, s.width, s.height).show(c);
    stencil.y = s.height;
    const w = whiten(s);
    w.factor = 1;
    s.mask = stencil;

    mask.withStep(() => {
        if (c.invulnerable > 0)
            return;
        if (!mask.collides(player))
            return;

        c.invulnerable = 20;
        health.damage();
        v.at(player);
        v.y -= 8;
        v.x = c.x;
        player.hspeed = 0;
        player.engine.knockback.y = 0;
        player.engine.knockback.x = (player.x < c.x ? -1 : 1) * 3;

        if (health.isDead)
            explode(c);
        else
            ClownHurt.play();
    });

    c.withAsync(async () => {
        await Promise.all([
            lerp(stencil, 'y').to(0).over(150),
            lerp(w, 'factor').to(0).over(250)
        ]);
    });

    c.withAsync(async () => {
        await wait(() => c.x !== 0 || c.y !== 0);
        const r = getWorldBounds(mask);
        const block = resolveBlock(r as any);
        block.visible = false;
        c.on('removed', () => {
            if (!block.destroyed)
                block.destroy();
        });
    })

    return c;
}

function explode(d: DisplayObject) {
    const b = getWorldBounds(d);
    const x = b.x + b.width / 2;
    for (let i = 0; i < b.height; i += 16)
        confetti(4, 20).at(x, b.y + i).ahead();
    d.destroy();
    ClownExplode.play();
}
