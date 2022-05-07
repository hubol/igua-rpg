import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Burst, Burst2} from "../textures";
import {Sprite, Texture} from "pixi.js";
import {scene} from "../igua/scene";
import {merge} from "../utils/object/merge";

const burst8pxTextures = subimageTextures(Burst, 4);
export const burst12pxTextures = subimageTextures(Burst2, 4);

export function smallPop(size: 8 | 12 = 8, container = scene.gameObjectStage)
{
    const textures = size === 8 ? burst8pxTextures : burst12pxTextures;
    return container.addChild(smallPopTextures(textures));
}

export function smallPopTextures(textures: Texture[])
{
    const sprite = merge(new Sprite(textures[0]), { life: 0 });
    sprite.anchor.set(0.5, 0.5);

    return sprite.withStep(() => {
        sprite.life += 0.3 / 4;
        if (sprite.life >= 1)
            sprite.destroy();
        else
            sprite.texture = textures[Math.floor(sprite.life * textures.length)];
    });
}
