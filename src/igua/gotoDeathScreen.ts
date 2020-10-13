import {level} from "./level/level";
import {game, loadSavedProgress, recreatePlayer} from "./game";
import {progress} from "./data/progress";
import {jukebox} from "./jukebox";
import {scene} from "./scene";

export function gotoDeathScreen()
{
    jukebox.stop();
    game.player.isDead = true;
    [scene.cameraStage, scene.parallax1Stage].forEach(x => x.removeAllChildren());
    scene.backgroundColor = 0x000000;
    setTimeout(() => {
        recreatePlayer();
        loadSavedProgress();
        level.goto(progress.levelName);
    },
    4_000)
}