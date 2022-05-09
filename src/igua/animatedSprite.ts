import {Sprite, Texture} from "pixi.js";
import {merge} from "../utils/object/merge";
import {cyclic} from "../utils/math/number";

export function animatedSprite(textures: Texture[], speed: number, once = false) {
    const sprite = merge(Sprite.from(textures[0]), { imageIndex: 0, imageSpeed: speed });
    return sprite.withStep(() => {
        if (once && sprite.imageIndex + sprite.imageSpeed >= textures.length)
            return sprite.destroy();
        sprite.imageIndex = cyclic(sprite.imageIndex + sprite.imageSpeed, 0, textures.length);
        sprite.texture = textures[Math.floor(sprite.imageIndex)];
    })
}
