import {merge} from "../../utils/merge";
import {game} from "../game";
import {sceneStack} from "../scene";
import {level} from "../level/level";
import {jukebox} from "../jukebox";
import {progress} from "../data/progress";
import {environment} from "../environment";

function createDev() {
    return {
        get game() {
            return game;
        },
        get scenes() {
            return sceneStack.toArray();
        },
        get level() {
            return level;
        },
        get jukebox() {
            return jukebox;
        },
        get progress() {
            return progress;
        },
        get environment() {
            return environment;
        }
    };
}

export function devWindow()
{
    merge(window, { dev: createDev() });
}