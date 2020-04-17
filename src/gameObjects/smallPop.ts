import {subimageTextures} from "../utils/simpleSpritesheet";
import {Burst, Burst2} from "../textures";
import {game} from "../igua/game";
import {Sprite} from "pixi.js";

const burst8pxTextures = subimageTextures(Burst, 4);
const burst12pxTextures = subimageTextures(Burst2, 4);

export function smallPop(size: 8 | 12 = 8, container = game.gameObjectStage)
{
    const textures = size === 8 ? burst8pxTextures : burst12pxTextures;

    const sprite = new Sprite(textures[0]);
    sprite.anchor.set(0.5, 0.5);

    let life = 0;
    sprite.withStep(() => {
        life += 0.3 / 4;
        if (life >= 1)
            sprite.destroy();
        else
            sprite.texture = textures[Math.floor(life * textures.length)];
    });
    container.addChild(sprite);
    return sprite;
}