import {Container} from "pixi.js";
import {AsshatTicker} from "../utils/asshatTicker";
import {stepPlayerCamera} from "./playerCamera";
import {advanceKeyListener, startKeyListener} from "../utils/browser/key";
import {hud} from "../gameObjects/hud";
import {level} from "./level/level";
import {getInitialProgress, progress, setProgress} from "./data/progress";
import {AsshatApplication} from "../utils/pixi/createApplication";
import {environment} from "./environment";
import {devProgress} from "./dev/devProgress";
import {scene} from "./scene";
import {devWindow} from "./dev/devWindow";

export let game: ReturnType<typeof createGame>;
function createGame(application: AsshatApplication)
{
    application.ticker.start();

    const ticker = new AsshatTicker();

    startKeyListener();
    ticker.add(advanceKeyListener);

    application.ticker.add(() => {
        ticker.update();
        scene.ticker.update();
    });

    const sceneStage = new Container();
    const hudStage = new Container().withTicker(ticker);

    application.stage.addChild(sceneStage, hudStage);

    return {
        hudStage,
        sceneStage,
        maxFps: application.maxFps,
        ticker,
        get width() {
            return application.renderer.width;
        },
        get height() {
            return application.renderer.height;
        },
        renderer: application.renderer
    };
}

export function startGame(application: AsshatApplication)
{
    game = createGame(application);

    game.ticker.add(stepPlayerCamera);

    game.hudStage.addChild(hud());

    if (environment.isProduction) {
        level.goto('TitleScreen');
    }
    else {
        loadDevProgress();
        devWindow();
    }
}

export function loadDevProgress()
{
    setProgress(getInitialProgress());
    devProgress();
    level.goto(progress.levelName);
}
