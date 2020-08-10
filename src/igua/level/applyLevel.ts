import {game} from "../game";
import {applyLevelStyle} from "../style";
import {BitmapText} from "pixi.js";
import {testCutscene, testLevel} from "../../cutscene/testScene";
import {npc} from "../../gameObjects/npc";
import {AcrobatixFont} from "../../fonts";
import {centerPlayerCamera} from "../playerCamera";
import {ApplyLevelArgs, GameObjects} from "./applyLevelArgs";

export function applyLevel<T>(applyLevelArgs: ApplyLevelArgs<T>): GameObjects<T>
{
    game.level.width = applyLevelArgs.width;
    game.level.height = applyLevelArgs.height;
    applyLevelStyle(applyLevelArgs.style);

    game.player.hspeed = 0;
    game.player.vspeed = 0;

    const gameObjects = applyLevelArgs.gameObjectsSupplier();

    setTimeout(testLevel);
    game.gameObjectStage.addChild(npc(64, 256 - 32 - 8));
    game.gameObjectStage.addChild(new BitmapText("Stupid fuck", { fontName: AcrobatixFont.font }).at(128, 128));
    game.cutscenePlayer.playCutscene(testCutscene());
    // TODO applyPlayerPosition(entities.filter(x => x.name === "Checkpoint" && checkpointName === x.values.name).firstOrDefault());

    centerPlayerCamera();

    return gameObjects;
}

function applyPlayerPosition(entity)
{
    if (!entity)
        return;

    game.player.x = entity.x;
    game.player.y = entity.y - 9;
}