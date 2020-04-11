import {player} from "./player";
import {block, pipe, slope} from "./walls";
import {HotTerrain, loadTexturesAsync} from "./textures";
import {loadFontsAsync} from "./fonts";
import {app, startApp} from "./app";
import { TilingSprite } from "pixi.js";

async function startGame()
{
    startApp();

    await loadTexturesAsync();
    await loadFontsAsync();

    app.backgroundColor = 0x0000ff;

    app.terrainStage.addChild(
        slope(16, 192 + 16, 128, 256),
        slope(160, 160, 256, 96),
        slope(64, 256, 200 - 25, 200),
        block(16, 256, 0, 192 + 16),
        block(256, 256, 64, 250),
        block(256 - 25, 250, 200 - 25, 200));

    app.terrainFill = new TilingSprite(HotTerrain, 256, 256);

    app.pipeStage.addChild(
        pipe(32, 32, 64, 64),
        pipe(256, 64, 64, 64),
        pipe(192, 64, 64, 192));

    app.stage.addChild(player());
}
window.onload = startGame;