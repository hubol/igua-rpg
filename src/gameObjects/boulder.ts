import { Boulder } from "../textures";
import {Sprite} from "pixi.js";
import {player} from "./player";
import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {scene} from "../igua/scene";
import {Vector} from "../utils/math/vector";

export const resolveBoulder =
    resolveGameObject("Boulder", e => {
        const b = boulder().at(e);
        b.width = e.width;
        b.height = e.height;
        return scene.gameObjectStage.addChild(b);
    });

function bouncePlayer(self: Vector, factor = 3) {
    player.hspeed = 0;
    player.engine.knockback.y = 0;

    const dir = player.vcpy().add(0, -8).add(self, -1).normalize().scale(factor);
    player.engine.knockback.x = dir.x;
    player.vspeed = dir.y;
}

export function boulder() {
    const s = Sprite.from(Boulder)
        .withStep(() => {
            if (s.collides(player)) {
                bouncePlayer(s);
            }
        });
    s.anchor.set(0.5, 0.5);

    return s;
}
