import {Tumbleweed} from "../textures";
import {Sprite} from "pixi.js";
import {rng} from "../utils/rng";
import {now} from "../utils/now";
import {push} from "./walls";
import {merge} from "../utils/object/merge";

export function tumbleweed() {
    const sprite = merge(Sprite.from(Tumbleweed), { hspeed: 0, vspeed: 0 }).withStep(() => {
        const r = push(sprite, 10);

        sprite.x += sprite.hspeed;
        sprite.y += sprite.vspeed;

        sprite.hspeed += Math.sin(now.s * 0.2) * 0.05;
        sprite.angle += sprite.hspeed;
        sprite.hspeed = Math.sign(sprite.hspeed) * Math.min(2.6, Math.abs(sprite.hspeed));
        if (!r.isOnGround)
            sprite.vspeed += .3;
        sprite.vspeed = Math.min(sprite.vspeed, 3);
    });
    sprite.anchor.set(0.5, 0.5);
    sprite.angle = rng() * 360;
    return sprite;
}
