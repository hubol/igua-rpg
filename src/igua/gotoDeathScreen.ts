import {jukebox} from "./jukebox";
import {disablePlayerCollision, player} from "../gameObjects/player";
import {persistence} from "./data/persistence";
import {environment} from "./environment";
import {loadDevProgress} from "./game";
import {scene} from "./scene";
import {sleep} from "../cutscene/sleep";

export function gotoDeathScreen()
{
    if (player.isDead)
        return;
    jukebox.stop();

    disablePlayerCollision();
    player.isDead = true;
    player.invulnerableFrameCount = 10000;
    player.hspeed = 0;
    player.vspeed = 0;

    scene.gameObjectStage.withAsync(async () => {
        await sleep(4000);
        await revive();
    });
}

async function revive() {
    if (environment.isProduction)
        await persistence.load();
    else
        loadDevProgress();
}
