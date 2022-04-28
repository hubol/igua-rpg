import {merge} from "../../utils/merge";
import {game} from "../game";
import {sceneStack} from "../scene";
import {level} from "../level/level";
import {jukebox} from "../jukebox";
import {progress} from "../data/progress";
import {environment} from "../environment";
import {player} from "../../gameObjects/player";

function createDev() {
    return {
        game,
        scene: sceneStack.toArray()[0],
        scenes: sceneStack.toArray(),
        level,
        jukebox,
        player,
        progress,
        environment
    };
}

export function devWindow()
{
    merge(window, {
        get dev()
        {
            return createDev();
        }
    });
}