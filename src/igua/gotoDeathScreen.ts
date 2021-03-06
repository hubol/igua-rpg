import {level} from "./level/level";
import {loadSavedProgress} from "./game";
import {progress} from "./data/progress";
import {jukebox} from "./jukebox";
import {scene} from "./scene";
import {player, recreatePlayer} from "../gameObjects/player";

export function gotoDeathScreen()
{
    jukebox.stop();
    player.isDead = true;
    [scene.cameraStage, scene.parallax1Stage].forEach(x => x.removeAllChildren());
    scene.backgroundColor = 0x000000;
    setTimeout(() => {
        recreatePlayer();
        loadSavedProgress();
        level.goto(progress.levelName);
    },
    4_000)
}