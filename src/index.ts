import {loadTexturesAsync} from "./textures";
import {loadFontsAsync} from "./fonts";
import {loadHowlsAsync} from "./utils/loadHowls";
import * as PIXI from "pixi.js";
import {handlePromiseCancellation} from "pissant";
import {discoverGameObjectResolvers} from "../tools/gen-levelargs/discoverGameObjectResolvers";
import {
    publishGameObjectResolvers,
    publishGameObjectResolversIsRequested
} from "../tools/write-levelargs/appOnly/publishGameObjectResolvers";
import {environment} from "./igua/environment";

async function initialize()
{
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    const howls = Object.values(require("./sounds")) as Howl[];
    await Promise.all([loadFontsAsync(), loadTexturesAsync(), loadHowlsAsync(howls)]);
    require("./utils/arrayExtensions");
    require("./utils/pixiExtensions");
    if (publishGameObjectResolversIsRequested())
        discoverAndPublishGameObjectResolvers();
    else
        require("./igua/game").startGame();
}

if (environment.isProduction)
    document.body.appendChild(createStartGameButtonElement());
else
    window.onload = initialize;

window.onunhandledrejection = handlePromiseCancellation;

function discoverAndPublishGameObjectResolvers()
{
    publishGameObjectResolvers(discoverGameObjectResolvers([{
        modules: require("./gameObjects/**/*.*"),
        path: "src/gameObjects"
    }]));
}

function createStartGameButtonElement()
{
    const buttonElement = document.createElement("button");
    buttonElement.id = "startButton";
    buttonElement.textContent = "Start game";
    buttonElement.onclick = () => {
        document.body.removeChild(buttonElement);
        setTimeout(initialize);
    };
    return buttonElement;
}