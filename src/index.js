import {player} from "./player";
import {block, pipe, slope} from "./walls";
import {HotTerrain, loadTexturesAsync} from "./textures";
import {loadFontsAsync} from "./fonts";
import {game, startGame} from "./game";
import { TilingSprite } from "pixi.js";
import {stepPlayerCamera} from "./playerCamera";

async function initialize()
{
    startGame();

    await loadTexturesAsync();
    await loadFontsAsync();

    game.player = player();
    game.ticker.add(stepPlayerCamera);

    game.backgroundColor = 0x0000ff;

    game.terrainStage.addChild(
        slope(16, 192 + 16, 128, 256),
        slope(160, 160, 256, 96),
        slope(64, 256, 200 - 25, 200),
        block(16, 256, 0, 192 + 16),
        block(256, 256, 64, 250),
        block(256 - 25, 250, 200 - 25, 200));

    game.terrainFill = new TilingSprite(HotTerrain, 256, 256);

    game.pipeStage.addChild(
        pipe(32, 32, 64, 64),
        pipe(256, 64, 64, 64),
        pipe(192, 64, 64, 192));

    game.stage.addChild(game.player);
}
window.onload = initialize;