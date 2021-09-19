import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Sparkle} from "../textures";
import {animatedSprite} from "../igua/animatedSprite";
import {circle} from "../utils/math/circle";
import {scene} from "../igua/scene";

export const sparkles = (x, y, count, initialRadius, life) => {
    circle(x, y, initialRadius, count).forEach(x => scene.gameObjectStage.addChild(sparkle(x.xUnit, x.yUnit, life).at(x)));
};

const textures = subimageTextures(Sparkle, 3);

function sparkle(hspeed, vspeed, life) {
    const sprite = animatedSprite(textures, 1 / 6)
        .withStep(() => {
            sprite.x += hspeed;
            sprite.y += vspeed;
            if (life -- <= 0)
                sprite.destroy();
        });
    sprite.anchor.set(0.5, 0.5);
    return sprite;
}
