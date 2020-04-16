import {subimageTextures} from "../utils/simpleSpritesheet";
import {Burst} from "../textures";
import {game} from "../game";
import {Sprite} from "pixi.js";

export function particleBurst(x, y, tint, container = game.gameObjectStage)
{
    const burstTextures = subimageTextures(Burst, 4);

    const sprite = new Sprite(burstTextures[0]);
    sprite.position.set(x, y);
    sprite.anchor.set(0.5, 0.5);
    sprite.tint = tint;

    let life = 0;
    sprite.withStep(() => {
        life += 0.3 / 4;
        if (life >= 1)
            sprite.destroy();
        else
            sprite.texture = burstTextures[Math.floor(life * burstTextures.length)];
    });
    container.addChild(sprite);
}