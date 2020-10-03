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
import {createApplication} from "./utils/createApplication";
import {upscaleGameCanvas} from "./igua/upscaleGameCanvas";
import {devMute} from "./igua/devMute";
import {handleIguaPromiseRejection} from "./utils/rejection";
import {make2dCanvasSink} from "./utils/make2dCanvasSink";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const application = createApplication({width: 256, height: 256, targetFps: 60, showCursor: false});

async function initialize()
{
    upscaleGameCanvas(addGameCanvasToDocument(application.canvasElement));

    if (!environment.isProduction)
        devMute();

    const howls = Object.values(require("./sounds")) as Howl[];
    await Promise.all([loadFontsAsync(), loadTexturesAsync(), loadHowlsAsync(howls)]);
    require("./utils/arrayExtensions");
    require("./utils/pixiExtensions");
    if (publishGameObjectResolversIsRequested())
        discoverAndPublishGameObjectResolvers();
    else
        require("./igua/game").startGame(application);
}

if (environment.isProduction && !environment.isElectron)
    document.body.appendChild(createStartGameButtonElement());
else
    window.onload = initialize;

window.addEventListener("unhandledrejection", handleIguaPromiseRejection);
window.addEventListener("unhandledrejection", handlePromiseCancellation);

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

function addGameCanvasToDocument(element: HTMLCanvasElement)
{
    if (environment.isSafari)
        element = make2dCanvasSink(element);

    element.id = "gameCanvas";
    document.body.appendChild(element);

    return element;
}