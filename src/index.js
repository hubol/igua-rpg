import {loadTexturesAsync} from "./textures";
import {loadFontsAsync} from "./fonts";
import {loadHowlsAsync} from "./utils/loadHowls";
import * as exportedSounds from "./sounds";
import * as PIXI from "pixi.js";
import {handlePromiseCancellation} from "pissant";
import {discoverGameObjectResolvers} from "./igua/level/discoverGameObjectResolvers";

async function initialize()
{
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    const howls = Object.values(exportedSounds);
    await Promise.all([loadFontsAsync(), loadTexturesAsync(), loadHowlsAsync(howls)]);
    require("./utils/arrayExtensions");
    require("./utils/pixiExtensions");
    if (window?.dev?.discoverGameObjectResolvers)
        localStorage.setItem("gameObjectResolvers", JSON.stringify(discoverGameObjectResolvers()));
    else
        require("./igua/game").startGame();
}

window.onload = initialize;
window.onunhandledrejection = handlePromiseCancellation;