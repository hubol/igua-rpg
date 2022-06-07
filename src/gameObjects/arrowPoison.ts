import {vdir, Vector} from "../utils/math/vector";
import {Sprite} from "pixi.js";
import {ArrowPoison} from "../textures";
import {player} from "./player";
import {ArrowKnock} from "../sounds";
import {isTouchingSolid} from "./walls";

export function arrowPoison(speed: Vector) {
    ArrowKnock.play();
    let life = 100;
    const s = Sprite.from(ArrowPoison)
        .trimHitbox()
        .centerAnchor()
        .withStep(() => {
            s.rotation = vdir(speed);
            s.add(speed);
            if (life-- <= 0 || (life < 97 && isTouchingSolid(s, 4)))
                return s.destroy();
            if (player.collides(s) && s.effectPlayer('poison'))
                s.destroy();
        });
    return s;
}