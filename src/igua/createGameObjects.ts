import {game} from "./game";
import {applyLevelStyle} from "./style";
import {progress} from "./progress";
import {valuable} from "../gameObjects/valuable";
import {block, pipe, slope} from "../gameObjects/walls";
import {BitmapText, Sprite} from "pixi.js";
import {LeftPipeEnd, RightPipeEnd} from "../textures";
import {gate} from "../gameObjects/gate";
import {testCutscene, testLevel} from "../cutscene/testScene";
import {npc} from "../gameObjects/npc";
import {AcrobatixFont} from "../fonts";
import {centerPlayerCamera} from "./playerCamera";

interface LevelJson<T>
{
    width: number;
    height: number;
    style: number;
    entities: EntitiesJson<T>;
}

type EntitiesJson<T> = {
    [key in keyof T]: T[key]
}

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type GameObjects<T> = {
    [key in keyof T]: GameObject & { source: Readonly<T[key]> }
}

interface GameObject
{
    x: number;
    y: number;
    destroy(): void;
}

interface EntitiesCommon
{
    [index: string]: EntityCommon;
}

interface EntityCommon
{
    type: string;
    uid: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

function cuckMerge<T, U>(src: T, dst: U): T & U
{
    for (const key of Object.keys(src))
    {
        if (key in dst)
            continue;

        dst[key] = src[key];
    }

    return dst as T & U;
}

export function createGameObjects<T>(level: LevelJson<T>): GameObjects<T>
{
    game.level.width = level.width;
    game.level.height = level.height;
    applyLevelStyle(level.style);

    game.player.hspeed = 0;
    game.player.vspeed = 0;

    const gameObjectEntities = {} as GameObjects<T>;
    const entities = level.entities as unknown as EntitiesCommon;
    for (const key of Object.keys(entities))
    {
        const entity = entities[key];
        const gameObject = createGameObject(entity);
        gameObjectEntities[key] = cuckMerge(
            {
                x: -1,
                y: -1,
                destroy()
                {
                    console.trace(this, "was destroyed");
                },
                source: entity
            },
            gameObject);
    }

    setTimeout(testLevel);
    game.gameObjectStage.addChild(npc(64, 256 - 32 - 8));
    game.gameObjectStage.addChild(new BitmapText("Stupid fuck", { fontName: AcrobatixFont.font }).at(128, 128));
    game.cutscenePlayer.playCutscene(testCutscene());
    // TODO applyPlayerPosition(entities.filter(x => x.name === "Checkpoint" && checkpointName === x.values.name).firstOrDefault());

    centerPlayerCamera();

    return gameObjectEntities;
}

function createGameObject(entity: EntityCommon)
{
    const anyEntity = entity as any;

    if (entity.type === "ValuableOrange" || entity.type === "ValuableBlue")
    {
        const uid = entity.uid;
        if (!progress.gotLevelValuable.has(uid))
            return game.gameObjectStage.addChild(valuable(entity.x, entity.y, uid, entity.type));
    }
    else if (entity.type === "Player")
    {
        applyPlayerPosition(entity);
    }
    else if (entity.type === "Block")
    {
        return game.terrainStage.addChild(block(entity.x, entity.y, entity.x + entity.width, entity.y + entity.height));
    }
    else if (entity.type === "SlopeRight")
    {
        return game.terrainStage.addChild(slope(entity.x, entity.y + entity.height, entity.x + entity.width, entity.y));
    }
    else if (entity.type === "SlopeLeft")
    {
        return game.terrainStage.addChild(slope(entity.x, entity.y, entity.x + entity.width, entity.y + entity.height));
    }
    else if (entity.type === "PipeRight")
    {
        return game.pipeStage.addChild(pipe(entity.x, entity.y + entity.height, entity.x + entity.width, entity.y));
    }
    else if (entity.type === "PipeLeft")
    {
        return game.pipeStage.addChild(pipe(entity.x, entity.y, entity.x + entity.width, entity.y + entity.height));
    }
    else if (entity.type === "PipeHorizontal")
    {
        return game.pipeStage.addChild(pipe(entity.x, entity.y, entity.x + entity.width, entity.y));
    }
    else if (entity.type === "PipeRightEnd")
    {
        const sprite = Sprite.from(RightPipeEnd);
        sprite.x = entity.x;
        sprite.y = entity.y;
        return game.pipeStage.addChild(sprite);
    }
    else if (entity.type === "PipeLeftEnd")
    {
        const sprite = Sprite.from(LeftPipeEnd);
        sprite.anchor.set(1, 0);
        sprite.x = entity.x;
        sprite.y = entity.y;
        return game.pipeStage.addChild(sprite);
    }
    else if (entity.type === "Gate")
    {
        const destination = {
            levelName: anyEntity.levelName,
            checkpointName: anyEntity.checkpointName,
        };
        return game.gameObjectStage.addChild(gate(entity.x, entity.y, entity.width, entity.height, destination));
    }
    return {};
}

function applyPlayerPosition(entity)
{
    if (!entity)
        return;

    game.player.x = entity.x;
    game.player.y = entity.y - 9;
}