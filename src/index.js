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
import {Test} from "./levels";
import {loadSoundsAsync} from "./loadSounds";

async function initialize()
{
    startGame();

    await Promise.all([loadFontsAsync(), loadTexturesAsync(), loadSoundsAsync()]);

    game.player = player();
    game.ticker.add(stepPlayerCamera);

    loadLevel(Test);

    game.stage.addChild(game.player);
}
window.onload = initialize;