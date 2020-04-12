import {game} from "./game";
import {block, pipe, slope} from "./walls";
import {Sprite} from "pixi.js";
import {LeftPipeEnd, RightPipeEnd} from "./textures";
import {applyLevelStyle} from "./style";

export function unloadLevel()
{
    game.terrainStage.removeChildren();
    game.pipeStage.removeChildren();
}

export function loadLevel(level: Ogmo.Level)
{
    game.level.width = level.width;
    game.level.height = level.height;
    applyLevelStyle(level.values.style);

    for (const entity of level.layers[0].entities)
    {
        if (entity.name === "Player")
        {
            game.player.x = entity.x;
            game.player.y = entity.y - 27;
        }
        else if (entity.name === "Block")
        {
            game.terrainStage.addChild(block(entity.x, entity.y, entity.x + entity.width, entity.y + entity.height));
        }
        else if (entity.name === "SlopeRight")
        {
            game.terrainStage.addChild(slope(entity.x, entity.y + entity.height, entity.x + entity.width, entity.y));
        }
        else if (entity.name === "SlopeLeft")
        {
            game.terrainStage.addChild(slope(entity.x, entity.y, entity.x + entity.width, entity.y + entity.height));
        }
        else if (entity.name === "PipeRight")
        {
            game.pipeStage.addChild(pipe(entity.x, entity.y + entity.height, entity.x + entity.width, entity.y));
        }
        else if (entity.name === "PipeLeft")
        {
            game.pipeStage.addChild(pipe(entity.x, entity.y, entity.x + entity.width, entity.y + entity.height));
        }
        else if (entity.name === "PipeHorizontal")
        {
            game.pipeStage.addChild(pipe(entity.x, entity.y, entity.x + entity.width, entity.y));
        }
        else if (entity.name === "PipeRightEnd")
        {
            const sprite = Sprite.from(RightPipeEnd);
            sprite.x = entity.x;
            sprite.y = entity.y;
            game.pipeStage.addChild(sprite);
        }
        else if (entity.name === "PipeLeftEnd")
        {
            const sprite = Sprite.from(LeftPipeEnd);
            sprite.anchor.set(1, 0);
            sprite.x = entity.x;
            sprite.y = entity.y;
            game.pipeStage.addChild(sprite);
        }
    }
}