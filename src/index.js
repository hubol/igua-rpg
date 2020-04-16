// noinspection ES6UnusedImports
import * as _ from "./utils/arrayExtensions";
// noinspection ES6UnusedImports
import * as __ from "./utils/pixiExtensions";

import {loadTexturesAsync} from "./textures";
import {loadFontsAsync} from "./fonts";
import {prepareGame} from "./igua/game";
import {loadHowlsAsync} from "./utils/loadHowls";
import * as exportedSounds from "./sounds";

async function initialize()
{
    prepareGame();
    const howls = Object.values(exportedSounds);
    await Promise.all([loadFontsAsync(), loadTexturesAsync(), loadHowlsAsync(howls)]);
    require("./startGame").startGame();
}
window.onload = initialize;