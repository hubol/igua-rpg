import {merge} from "../../utils/merge";
import {game} from "../game";
import {sceneStack} from "../scene";
import {level} from "../level/level";
import {jukebox} from "../jukebox";
import {progress} from "../data/progress";
import {environment} from "../environment";

function createDev() {
    return {
        game,
        scenes: sceneStack.toArray(),
        level,
        jukebox,
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