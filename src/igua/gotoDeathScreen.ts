import {jukebox} from "./jukebox";
import {scene} from "./scene";
import {player} from "../gameObjects/player";
import {persistence} from "./data/persistence";
import {environment} from "./environment";
import {loadDevProgress} from "./game";

export function gotoDeathScreen()
{
    if (player.isDead)
        return;
    jukebox.stop();
    player.isDead = true;
    scene.cameraStage.children.filter(x => x !== scene.playerStage).forEach(x => x.destroy());
    scene.parallax1Stage.removeAllChildren();
    scene.backgroundColor = 0x000000;
    setTimeout(revive, 4_000)
}

async function revive() {
    if (environment.isProduction)
        await persistence.load();
    else
        loadDevProgress();
}
