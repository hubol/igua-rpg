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
import {scene, sceneStack} from "./scene";
import {devWindow} from "./dev/devWindow";
import {advanceInput, startInput} from "./io/input";
import {SplashScreen} from "../levels/splashScreen";

export let game: ReturnType<typeof createGame>;
function createGame(application: AsshatApplication)
{
    const ticker = new AsshatTicker();

    startKeyListener();
    startInput();
    ticker.add(advanceKeyListener);
    ticker.add(advanceInput);

    application.animator.add(() => {
        ticker.update();
        scene.ticker.update();
        stepPlayerCamera();
        scene.endTicker.update();
    });

    const sceneStage = new Container();
    const hudStage = new Container().withTicker(ticker);

    application.stage.accessibleChildren = false;
    application.stage.interactiveChildren = false;
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
        renderer: application.renderer,
        animator: application.animator,
    };
}

export function startGame(application: AsshatApplication)
{
    game = createGame(application);

    game.hudStage.addChild(hud());

    devWindow();

    if (environment.isProduction) {
        sceneStack.replace(SplashScreen);
    }
    else {
        loadDevProgress();
    }
}

export function loadDevProgress()
{
    setProgress(getInitialProgress());
    devProgress();
    level.goto(progress.levelName);
}
