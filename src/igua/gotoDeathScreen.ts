import {jukebox} from "./jukebox";
import {scene} from "./scene";
import {player} from "../gameObjects/player";
import {persistence} from "./data/persistence";
import {environment} from "./environment";
import {loadDevProgress} from "./game";
import {merge} from "../utils/object/merge";
import {Rectangle} from "pixi.js";

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

function disablePlayerCollision() {
    merge(player, {
            rectangle: new Rectangle(-100000, -100000, 1, 1),
            collides() {
                return false;
            }
        });
}

async function revive() {
    if (environment.isProduction)
        await persistence.load();
    else
        loadDevProgress();
}
