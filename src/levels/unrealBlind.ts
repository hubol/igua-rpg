import {scene} from "../igua/scene";
import {UnrealBlindArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {Graphics} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {spikeBounce} from "../gameObjects/spikeBounce";
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {capitalBigKeyTextures} from "./capitalTemple";
import {jukebox} from "../igua/jukebox";
import {UnrealBlindMusic} from "../musics";
import {forceRenderable} from "../igua/forceRenderable";

export function UnrealBlind() {
    scene.backgroundColor = 0x002C38;
    scene.terrainColor = 0x002C38;
    scene.camera.mode = 'ahead';
    const level = applyOgmoLevel(UnrealBlindArgs);
    jukebox.play(UnrealBlindMusic);

    grid(32).tinted(0x004153).behind();
    const gridf = grid(32).tinted(0x004153).show(scene.cameraStage);
    gridf.mask = scene.terrainStage;
    scene.terrainStage.index += 3;
    forceRenderable(scene.terrainStage);
    scene.gameObjectStage.withAsync(async () => {
        await sleep(1000);
        for (let i = 0; i < 5; i++)
            scene.gameObjectStage.withAsync(() => showSpikesForever(128 - 256 * i));
    });
    bigKeyPiece(progress.flags.capital.bigKey, capitalBigKeyTextures[0], 'piece1').at(level.Key).ahead();
}

function grid(cell: number, width = scene.width, height = scene.height) {
    const gfx = new Graphics().lineStyle(1, 0xffffff);
    for (let i = 1; i < Math.ceil(height / cell); i++) {
        const y = i * cell;
        gfx.moveTo(0, y).lineTo(width, y);
    }

    for (let i = 1; i < Math.ceil(width / cell); i++) {
        const x = i * cell;
        gfx.moveTo(x, 0).lineTo(x, height);
    }

    return gfx;
}

async function showSpikesForever(x = 0) {
    while (true) {
        await show4Spikes(x);
        await sleep(2000);
        x += 64;
    }
}

async function show4Spikes(x: number) {
    for (let i = 0; i < 4; i++) {
        spikeBounce().at(x + i * 16, 0).show(scene.cameraStage);
        await sleep(40);
    }
}