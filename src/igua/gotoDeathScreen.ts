import {level} from "./level/level";
import {game, loadSavedProgress, recreatePlayer} from "./game";
import {progress} from "./progress";
import {jukebox} from "./jukebox";
import {scene, sceneStack} from "./scene";

export function gotoDeathScreen()
{
    jukebox.stop();
    while (sceneStack.pop()) { }
    sceneStack.push();
    game.player.isDead = true;
    scene.backgroundColor = 0x000000;
    setTimeout(() => {
        recreatePlayer();
        loadSavedProgress();
        level.gotoSync(progress.levelName);
    },
    4_000)
}