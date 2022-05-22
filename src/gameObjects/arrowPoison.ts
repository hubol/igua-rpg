import {vdir, Vector} from "../utils/math/vector";
import {Sprite} from "pixi.js";
import {ArrowPoison} from "../textures";
import {player} from "./player";
import {progress} from "../igua/data/progress";
import {merge} from "../utils/object/merge";
import {Undefined} from "../utils/types/undefined";

export function arrowPoison(speed: Vector) {
    let life = 100;
    const s = merge(Sprite.from(ArrowPoison), { onAttacked: Undefined<() => void>() })
        .trimHitbox()
        .centerAnchor()
        .withStep(() => {
            s.rotation = vdir(speed);
            s.add(speed);
            if (life-- <= 0)
                return s.destroy();
            if (player.collides(s) && player.damage(0)) {
                s.onAttacked?.();
                progress.poisonLevel++;
                s.destroy();
            }
        });
    return s;
}