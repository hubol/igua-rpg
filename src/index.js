// noinspection ES6UnusedImports
import * as _ from "./utils/arrayExtensions";
// noinspection ES6UnusedImports
import * as __ from "./utils/pixiExtensions";

import {player} from "./player";
import {loadTexturesAsync} from "./textures";
import {loadFontsAsync} from "./fonts";
import {game, startGame} from "./game";
import {stepPlayerCamera} from "./playerCamera";
import {loadLevel} from "./level";

async function initialize()
{
    startGame();

    await loadTexturesAsync();
    await loadFontsAsync();

    game.player = player();
    game.ticker.add(stepPlayerCamera);

    loadLevel(require("./levels/test.json"));

    game.stage.addChild(game.player);
}
window.onload = initialize;