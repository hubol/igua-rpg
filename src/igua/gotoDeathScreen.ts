import {jukebox} from "./jukebox";
import {scene} from "./scene";
import {createStagedFakePlayer, player, playerPuppet} from "../gameObjects/player";
import {persistence} from "./data/persistence";
import {environment} from "./environment";
import {loadDevProgress} from "./game";

export function gotoDeathScreen()
{
    if (player.isDead)
        return;
    jukebox.stop();

    createOffscreenFakePlayerAndCorpse();
    player.isDead = true;
    scene.camera.followPlayer = false;

    setTimeout(revive, 4_000)
}

function createOffscreenFakePlayerAndCorpse() {
    const { x, y, duckUnit, closedEyesUnit, scale: { x: xscale } } = player;
    player.destroy();

    createStagedFakePlayer();
    player.x = x;

    const corpse = playerPuppet().at(x, y).withStep(() => {
            corpse.visible = !corpse.visible;
            corpse.engine.step();
        })
        .show(scene.playerStage);
    corpse.duckUnit = duckUnit;
    corpse.closedEyesUnit = closedEyesUnit;
    corpse.scale.x = xscale;
    corpse.isDucking = true;
    corpse.canBlink = false;
    corpse.isClosingEyes = true;
}

async function revive() {
    if (environment.isProduction)
        await persistence.load();
    else
        loadDevProgress();
}
