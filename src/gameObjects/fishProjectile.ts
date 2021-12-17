import {Sprite} from "pixi.js";
import { FishProjectile } from "../textures";
import {player} from "./player";

export function fishProjectile(dx: number, dy: number) {
    const f = Sprite.from(FishProjectile).withStep(() => {
        f.x += dx;
        f.y += dy;
        dy += 0.3;
        f.angle += 4;
        if (f.collides(player))
            player.damage(10);
        if (dy > 15)
            f.destroy();
    });
    f.scale.x = Math.sign(dx) || 1;
    return f;
}
