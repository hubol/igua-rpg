// noinspection ES6UnusedImports
import * as _ from "./utils/arrayExtensions";

import {player} from "./player";
import {HotTerrain, loadTexturesAsync} from "./textures";
import {loadFontsAsync} from "./fonts";
import {game, startGame} from "./game";
import { TilingSprite } from "pixi.js";
import {stepPlayerCamera} from "./playerCamera";
import {loadLevel} from "./level";

async function initialize()
{
    startGame();

    await loadTexturesAsync();
    await loadFontsAsync();

    game.player = player();
    game.ticker.add(stepPlayerCamera);

    game.backgroundColor = 0x0000ff;
    game.terrainFill = new TilingSprite(HotTerrain, 256, 256);

    loadLevel(require("./levels/test.json"));

    game.stage.addChild(game.player);
}
window.onload = initialize;