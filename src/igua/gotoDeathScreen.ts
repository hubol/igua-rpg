import {jukebox} from "./jukebox";
import {disablePlayerCollision, player} from "../gameObjects/player";
import {persistence} from "./data/persistence";
import {environment} from "./environment";
import {loadDevProgress} from "./game";

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

    setTimeout(revive, 4_000)
}

async function revive() {
    if (environment.isProduction)
        await persistence.load();
    else
        loadDevProgress();
}
