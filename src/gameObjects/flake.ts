import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {SnowmanFlakes} from "../textures";
import {Sprite} from "pixi.js";
import {rng} from "../utils/math/rng";

const flakes = subimageTextures(SnowmanFlakes, 3);

export const flake = () => {
    const sprite = Sprite.from(rng.choose(flakes));
    sprite.anchor.set(0.5, 0.5);
    let life = 10 + rng() * 10;

    return sprite.withStep(() => {
        if (life-- <= 0)
            return sprite.destroy();

        sprite.x += Math.sin(life) * 0.5;
        sprite.y += 1;
    });
}
