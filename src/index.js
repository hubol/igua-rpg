// noinspection ES6UnusedImports
import * as _ from "./utils/arrayExtensions";
// noinspection ES6UnusedImports
import * as __ from "./utils/pixiExtensions";

import {loadTexturesAsync} from "./textures";
import {loadFontsAsync} from "./fonts";
import {prepareGame} from "./game";
import {loadSoundsAsync} from "./loadSounds";

async function initialize()
{
    prepareGame();

    await Promise.all([loadFontsAsync(), loadTexturesAsync(), loadSoundsAsync()]);
    require("./startGame").startGame();
}
window.onload = initialize;