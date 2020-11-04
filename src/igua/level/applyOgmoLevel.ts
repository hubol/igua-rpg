import {centerPlayerCamera} from "../playerCamera";
import {ApplyOgmoLevelArgs, GameObjects} from "./applyOgmoLevelArgs";
import {progress} from "../data/progress";
import {level} from "./level";
import {player} from "../../gameObjects/player";

export function applyOgmoLevel<T>(args: ApplyOgmoLevelArgs<T>): GameObjects<T>
{
    level.width = args.width;
    level.height = args.height;

    player.hspeed = 0;
    player.vspeed = 0;

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
    player.x = v.x;
    player.y = v.y - 8;
    player.scale.x = v.faceRight ? 1 : -1;
}