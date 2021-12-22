import { Boulder } from "../textures";
import {Sprite} from "pixi.js";
import {player} from "./player";
import {scene} from "../igua/scene";
import {Vector} from "../utils/math/vector";
import {BoulderBless, CharacterHitCeiling} from "../sounds";
import {progress} from "../igua/data/progress";
import {resolveGameObject} from "../igua/level/resolveGameObject";

export const resolveBoulder =
    resolveGameObject("Boulder", e => {
        if (progress.flags.objects.clearedBoulder.has(e.uid))
            return;
        const b = boulder(e.uid).at(e);
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

export function boulder(uid) {
    let dying = false;
    const s = Sprite.from(Boulder)
        .withStep(() => {
            if (dying) {
                s.y += 5;
                return;
            }
            if (s.collides(player)) {
                CharacterHitCeiling.volume(1);
                CharacterHitCeiling.play();
                bouncePlayer(s);
                if (progress.flags.desert.bigKey.reward) {
                    BoulderBless.play();
                    progress.flags.objects.clearedBoulder.add(uid);
                    dying = true;
                }
            }
        });
    s.anchor.set(0.5, 0.5);

    return s;
}
