import {centerPlayerCamera} from "../playerCamera";
import {ApplyOgmoLevelArgs, GameObjects} from "./applyOgmoLevelArgs";
import {progress} from "../data/progress";
import {player} from "../../gameObjects/player";
import {scene, sceneStack} from "../scene";

export function applyOgmoLevel<T>(args: ApplyOgmoLevelArgs<T>): GameObjects<T>
{
    scene.width = args.width;
    scene.height = args.height;

    const gameObjectsLibrary = args.gameObjectsSupplier();

    if (sceneStack.isLevel)
    {
        player.hspeed = 0;
        player.vspeed = 0;
        const gameObjects = Object.values(gameObjectsLibrary).filter(x => !!x && typeof x === "object");
        applyPlayerStartingPosition(gameObjects);
        centerPlayerCamera();
    }

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