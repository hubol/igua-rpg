import {game} from "./game";
import {Sprite, TilingSprite, SCALE_MODES, Container, BLEND_MODES} from "pixi.js";
import {BlueGradient, HotTerrain, RockCracks} from "./textures";

export function applyLevelStyle(levelStyle: number)
{
    if (levelStyle === 0)
    {
        game.backgroundColor = 0x0000ff;
        game.terrainFill = new TilingSprite(HotTerrain, game.level.width, game.level.height);
    }
    else if (levelStyle === 1)
    {
        game.backgroundColor = 0xFCFFA5;
        BlueGradient.baseTexture.scaleMode = SCALE_MODES.LINEAR;
        const container = new Container();
        const sprite = Sprite.from(BlueGradient);
        sprite.width = game.level.width;
        sprite.height = game.level.height;
        const tilingSprite = new TilingSprite(RockCracks, game.level.width, game.level.height);
        tilingSprite.alpha = 0.7;
        tilingSprite.blendMode = BLEND_MODES.MULTIPLY;
        container.addChild(sprite, tilingSprite)
        game.terrainFill = container;
    }
}