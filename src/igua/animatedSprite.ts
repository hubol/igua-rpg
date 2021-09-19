import {Sprite, Texture} from "pixi.js";
import {merge} from "../utils/merge";
import {cyclic} from "../utils/math/number";

export function animatedSprite(textures: Texture[], speed: number) {
    const sprite = merge(Sprite.from(textures[0]), { imageIndex: 0, imageSpeed: speed });
    return sprite.withStep(() => {
        sprite.imageIndex = cyclic(sprite.imageIndex + sprite.imageSpeed, 0, textures.length);
        sprite.texture = textures[Math.floor(sprite.imageIndex)];
    })
}
