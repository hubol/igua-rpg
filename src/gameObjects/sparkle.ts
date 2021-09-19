import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Sparkle} from "../textures";
import {animatedSprite} from "../igua/animatedSprite";

export const sparkles = (x, y, count, initialRadius) => {

};

const textures = subimageTextures(Sparkle, 3);

export function sparkle(hspeed, vspeed, life) {
    const sprite = animatedSprite(textures, 1 / 6)
        .withStep(() => {
            sprite.x += hspeed;
            sprite.y += vspeed;
            if (life -- <= 0)
                sprite.destroy();
        });
    return sprite;
}
