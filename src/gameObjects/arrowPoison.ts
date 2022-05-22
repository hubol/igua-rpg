import {vdir, Vector} from "../utils/math/vector";
import {Sprite} from "pixi.js";
import {ArrowPoison} from "../textures";
import {player} from "./player";

export function arrowPoison(speed: Vector) {
    let life = 100;
    const s = Sprite.from(ArrowPoison)
        .trimHitbox()
        .centerAnchor()
        .withStep(() => {
            s.rotation = vdir(speed);
            s.add(speed);
            if (life-- <= 0)
                return s.destroy();
            if (player.collides(s) && s.effectPlayer('poison'))
                s.destroy();
        });
    return s;
}