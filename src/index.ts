import "zone.js";

Zone[Zone.__symbol__('ignoreConsoleErrorUncaughtError')] = true;

import {loadTexturesAsync} from "./textures";
import {loadFontsAsync} from "./fonts";
import {loadHowlsAsync} from "./utils/resources/loadHowls";
import * as PIXI from "pixi.js";
import {discoverGameObjectResolvers} from "../tools/gen-levelargs/discoverGameObjectResolvers";
import {
    publishGameObjectResolvers,
    publishGameObjectResolversIsRequested
} from "../tools/write-levelargs/publishGameObjectResolvers";
import {environment} from "./igua/environment";
import {createApplication} from "./utils/pixi/createApplication";
import {upscaleGameCanvas} from "./igua/upscaleGameCanvas";
import {devMute} from "./igua/dev/devMute";
import {handleIguaPromiseRejection} from "./utils/rejection";
import {make2dCanvasSink} from "./utils/browser/make2dCanvasSink";
import {Howl} from "howler";
import {useDynamicsCompressor} from "./utils/browser/useDynamicsCompressor";
import {handlePromiseCancellation} from "./utils/promise/cancellationToken";
import {showLoadingScreen} from "./igua/showLoadingScreen";

(PIXI.settings as any).ROUND_PIXELS = true;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const application = createApplication({width: 256, height: 256, maxFps: 60, showCursor: false});

async function initialize()
{
    try {
        performance.setResourceTimingBufferSize(500);

        upscaleGameCanvas(addGameCanvasToDocument(application.canvasElement));
        application.animator.start();

        const [ready, loadingScreenPromise] = showLoadingScreen(application);
        const howls = Object.values(require("./sounds")) as Howl[];
        await Promise.all([loadFontsAsync(), loadTexturesAsync(), loadHowlsAsync(howls)]);
        ready.ready();
        await loadingScreenPromise;

        performance.clearResourceTimings();

        useDynamicsCompressor();
        require("./utils/extensions/**/*.*");
        if (publishGameObjectResolversIsRequested())
            discoverAndPublishGameObjectResolvers();
        else
            require("./igua/game").startGame(application);

        if (!environment.isProduction) {
            devMute();
            require("./igua/dev/devPersistence").devPersistence();
            require("./igua/dev/devMiscCommands").devMiscCommands();
        }
    }
    catch (e) {
        console.error(e);
        showFatalError(e);
    }
}

function showFatalError(error) {
    const message = typeof error === 'string' ? error : ( error.message ? error.message : JSON.stringify(error) );
    document.body.innerHTML = `<h1>Fatal Error</h1>
<h2>${message}</h2>`;
}

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

function addGameCanvasToDocument(element: HTMLCanvasElement)
{
    if (environment.isSafari)
        element = make2dCanvasSink(element);

    element.id = "gameCanvas";
    document.body.appendChild(element);

    return element;
}
