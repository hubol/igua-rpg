import {jukebox} from "./jukebox";
import {scene} from "./scene";
import {createStagedFakePlayer, player, playerPuppet} from "../gameObjects/player";
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

    createOffscreenFakePlayerAndCorpse();
    player.isDead = true;
    scene.camera.followPlayer = false;

    setTimeout(revive, 4_000)
}

function createOffscreenFakePlayerAndCorpse() {
    const { x, y, duckUnit, closedEyesUnit, scale: { x: xscale } } = player;
    player.destroy();

    createStagedFakePlayer();
    merge(player, {
            rectangle: new Rectangle(-100000, -100000, 1, 1),
            collides() {
                return false;
            }
        })
        .hide();

    const corpse = createCorpse()
        .at(x, y)
        .withStep(() => player.at(corpse))
        .show(scene.playerStage);

    corpse.duckUnit = duckUnit;
    corpse.closedEyesUnit = closedEyesUnit;
    corpse.scale.x = xscale;
}

function createCorpse() {
    const corpse = playerPuppet()
    .withStep(() => {
        corpse.visible = !corpse.visible;
        corpse.engine.step();
    });
    corpse.isDucking = true;
    corpse.canBlink = false;
    corpse.isClosingEyes = true;
    return corpse;
}

async function revive() {
    if (environment.isProduction)
        await persistence.load();
    else
        loadDevProgress();
}
