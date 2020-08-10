import {game} from "../game";
import {applyLevelStyle} from "../style";
import {BitmapText} from "pixi.js";
import {testCutscene, testLevel} from "../../cutscene/testScene";
import {npc} from "../../gameObjects/npc";
import {AcrobatixFont} from "../../fonts";
import {centerPlayerCamera} from "../playerCamera";
import {ApplyOgmoLevelArgs, GameObjects} from "./applyOgmoLevelArgs";

export function applyOgmoLevel<T>(args: ApplyOgmoLevelArgs<T>): GameObjects<T>
{
    game.level.width = args.width;
    game.level.height = args.height;
    applyLevelStyle(args.style);

    game.player.hspeed = 0;
    game.player.vspeed = 0;

    const gameObjects = args.gameObjectsSupplier();

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