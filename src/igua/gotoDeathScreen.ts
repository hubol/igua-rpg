import {jukebox} from "./jukebox";
import {scene} from "./scene";
import {player, recreatePlayer} from "../gameObjects/player";
import {persistence} from "./data/persistence";

export function gotoDeathScreen()
{
    jukebox.stop();
    player.isDead = true;
    scene.cameraStage.children.filter(x => x !== scene.playerStage).forEach(x => x.destroy());
    scene.parallax1Stage.removeAllChildren();
    scene.backgroundColor = 0x000000;
    setTimeout(async () => {
        recreatePlayer();
        await persistence.load(false);
    },
    4_000)
}
