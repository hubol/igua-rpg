import { Boulder } from "../textures";
import {Sprite} from "pixi.js";
import {player} from "./player";
import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {scene} from "../igua/scene";

export const resolveBoulder =
    resolveGameObject("Boulder", e => {
        const b = boulder().at(e);
        b.width = e.width;
        b.height = e.height;
        return scene.gameObjectStage.addChild(b);
    });

export function boulder() {
    const s = Sprite.from(Boulder)
        .withStep(() => {
            if (s.collides(player)) {
                player.hspeed = 0;
                player.engine.knockback.y = 0;

                const dir = player.vcpy().add(0, -8).add(s, -1).normalize().scale(3);
                player.engine.knockback.x = dir.x;
                player.vspeed = dir.y;
            }
        });
    s.anchor.set(0.5, 0.5);

    return s;
}
