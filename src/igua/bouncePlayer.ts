import {Vector} from "../utils/math/vector";
import {player} from "../gameObjects/player";

export function bouncePlayer(self: Vector, factor = 3) {
    player.hspeed = 0;
    player.engine.knockback.y = 0;

    const dir = player.vcpy().add(0, -8).add(self, -1).normalize().scale(factor);
    player.engine.knockback.x = dir.x;
    player.vspeed = dir.y;
}
