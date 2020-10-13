import {Container} from "pixi.js";
import {AsshatTicker} from "../utils/asshatTicker";
import {stepPlayerCamera} from "./playerCamera";
import {player} from "../gameObjects/player";
import {advanceKeyListener, startKeyListener} from "../utils/browser/key";
import {CutscenePlayer} from "../cutscene/cutscene";
import {hud} from "../gameObjects/hud";
import {level} from "./level/level";
import {getInitialProgress, progress, setProgress} from "./progress";
import {AsshatApplication} from "../utils/pixi/createApplication";
import {environment} from "./environment";
import {devProgress} from "./dev/devProgress";
import {scene} from "./scene";

export let game: ReturnType<typeof createGame>;
function createGame(application: AsshatApplication)
{
    application.ticker.start();

    const ticker = new AsshatTicker();

    startKeyListener();
    ticker.add(advanceKeyListener);

    application.ticker.add(() => {
        ticker.update();
        scene?.ticker.update();
    });

    const sceneStage = new Container();
    const playerStage = new Container().withTicker(ticker);
    const hudStage = new Container().withTicker(ticker);

    application.stage.addChild(sceneStage, playerStage, hudStage);

    return {
        hudStage,
        sceneStage,
        playerStage,
        get applicationTicker() {
            return application.ticker;
        },
        ticker,
        camera: createCamera(),
        player: {} as ReturnType<typeof player>,
        get width() {
            return application.renderer.width;
        },
        get height() {
            return application.renderer.height;
        },
        level: {} as LevelInfo,
        cutscenePlayer: new CutscenePlayer()
    };
}

export function startGame(application: AsshatApplication)
{
    game = createGame(application);

    recreatePlayer();
    game.ticker.add(stepPlayerCamera);

    hud();

    loadSavedProgress();
    level.gotoSync(progress.levelName);
}

export function loadSavedProgress()
{
    setProgress(getInitialProgress()); // TODO read from localStorage
    if (!environment.isProduction)
        devProgress();
}

export function recreatePlayer()
{
    if (game.player?.destroy)
        game.player.destroy({children: true});

    game.player = player();
    game.playerStage.addChild(game.player);
}

function createCamera()
{
    return {
        get x() {
            return -scene.cameraStage.x;
        },
        get y() {
            return -scene.cameraStage.y;
        },
        set x(value) {
            game.playerStage.x = -value;
            scene.cameraStage.x = -value;
            scene.parallax1Stage.x = Math.round(-value * 0.9);
        },
        set y(value) {
            game.playerStage.y = -value;
            scene.cameraStage.y = -value;
            scene.parallax1Stage.y = Math.round(-value * 0.9);
        },
        width: 256,
        height: 256,
        followPlayer: true
    };
}

interface LevelInfo
{
    width: number;
    height: number;
}