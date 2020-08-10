import {game} from "./game";
import {block, pipe, slope} from "../gameObjects/walls";
import {Sprite, BitmapText} from "pixi.js";
import {LeftPipeEnd, RightPipeEnd} from "../textures";
import {applyLevelStyle} from "./style";
import {gate} from "../gameObjects/gate";
import {centerPlayerCamera} from "./playerCamera";
import {valuable} from "../gameObjects/valuable";
import {progress} from "./progress";
import {npc} from "../gameObjects/npc";
import {AcrobatixFont} from "../fonts";
import {testCutscene, testLevel} from "../cutscene/testScene";
import {RecycleablePromiseLibrary} from "../cutscene/recycleablePromiseLibrary";
import {sleep} from "pissant";
import {Ogmo} from "../types/ogmo";

const levelRecycleablePromiseLibrary = new RecycleablePromiseLibrary();

export function getLevelPromiseLibrary()
{
    return levelRecycleablePromiseLibrary.promiseLibrary;
}

export async function gotoLevel(level: Ogmo.Level, checkpointName?: string)
{
    game.applicationTicker.stop();
    await sleep(250);
    unloadLevel();
    loadLevel(level, checkpointName);
    game.applicationTicker.start();
}

export function unloadLevel()
{
    game.terrainStage.removeAllChildren();
    game.pipeStage.removeAllChildren();
    game.gameObjectStage.removeAllChildren();
    levelRecycleablePromiseLibrary.recycle();
}

export function loadLevel(level: Ogmo.Level, checkpointName?: string)
{
    game.level.width = level.width;
    game.level.height = level.height;
    applyLevelStyle(level.values.style);

    game.player.hspeed = 0;
    game.player.vspeed = 0;

    const entities = level.layers[0].entities;
    for (const entity of entities)
    {
        if (entity.name === "ValuableOrange" || entity.name === "ValuableBlue")
        {
            const uid = entity._eid;
            if (!progress.gotLevelValuable.has(uid))
                game.gameObjectStage.addChild(valuable(entity.x, entity.y, uid, entity.name));
        }
        else if (entity.name === "Player")
        {
            applyPlayerPosition(entity);
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
        else if (entity.name === "Gate")
        {
            const destination = {
                levelName: entity.values.levelName,
                checkpointName: entity.values.checkpointName,
            };
            game.gameObjectStage.addChild(gate(entity.x, entity.y, entity.width, entity.height, destination));
        }
    }

    setTimeout(testLevel);
    game.gameObjectStage.addChild(npc(64, 256 - 32 - 8));
    game.gameObjectStage.addChild(new BitmapText("Stupid fuck", { fontName: AcrobatixFont.font }).at(128, 128));
    game.cutscenePlayer.playCutscene(testCutscene());
    applyPlayerPosition(entities.filter(x => x.name === "Checkpoint" && checkpointName === x.values.name).firstOrDefault());

    centerPlayerCamera();
}

function applyPlayerPosition(entity)
{
    if (!entity)
        return;

    game.player.x = entity.x;
    game.player.y = entity.y - 9;
}