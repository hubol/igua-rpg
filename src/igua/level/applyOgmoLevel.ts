import {game} from "../game";
import {centerPlayerCamera} from "../playerCamera";
import {ApplyOgmoLevelArgs, GameObjects} from "./applyOgmoLevelArgs";
import {progress} from "../progress";
import {applyLevelStyle} from "./applyLevelStyle";

export function applyOgmoLevel<T>(args: ApplyOgmoLevelArgs<T>): GameObjects<T>
{
    game.level.width = args.width;
    game.level.height = args.height;
    applyLevelStyle(args.style);

    game.player.hspeed = 0;
    game.player.vspeed = 0;

    const gameObjectsLibrary = args.gameObjectsSupplier();

    const gameObjects = Object.values(gameObjectsLibrary).filter(x => !!x && typeof x === "object");
    applyPlayerStartingPosition(gameObjects);
    centerPlayerCamera();

    return gameObjectsLibrary;
}

function applyPlayerStartingPosition(gameObjects: any[])
{
    gameObjects.filter(x => x.type === "Player").forEach(setPlayerPosition);
    gameObjects.filter(x => x.type === "Checkpoint" && progress.checkpointName === x.name).forEach(setPlayerPosition);
}

function setPlayerPosition(v: { x: number, y: number, faceRight: boolean | undefined })
{
    game.player.x = v.x;
    game.player.y = v.y - 8;
    game.player.scale.x = v.faceRight ? 1 : -1;
}