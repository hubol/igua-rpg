import {subimageTextures} from "../utils/simpleSpritesheet";
import {Burst} from "../textures";
import {game} from "../igua/game";
import {Sprite} from "pixi.js";

const burstTextures = subimageTextures(Burst, 4);

export function smallPop(container = game.gameObjectStage)
{
    const sprite = new Sprite(burstTextures[0]);
    sprite.anchor.set(0.5, 0.5);

    let life = 0;
    sprite.withStep(() => {
        life += 0.3 / 4;
        if (life >= 1)
            sprite.destroy();
        else
            sprite.texture = burstTextures[Math.floor(life * burstTextures.length)];
    });
    container.addChild(sprite);
    return sprite;
}