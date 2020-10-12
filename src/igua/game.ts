import {Container, DisplayObject, Graphics} from "pixi.js";
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

export let game: ReturnType<typeof createGame>;
function createGame(application: AsshatApplication)
{
    application.ticker.start();

    const ticker = new AsshatTicker();

    startKeyListener();
    ticker.add(advanceKeyListener);

    application.ticker.add(() => ticker.update());

    const backgroundGraphics = new Graphics();
    const terrainStage = new Container();

    const parallax1Stage = new Container();
    const backgroundGameObjectStage = new Container();
    const terrainContainer = new Container();
    const pipeStage = new Container();
    const gameObjectStage = new Container();
    const stage = new Container();
    stage.addChild(backgroundGameObjectStage, pipeStage, terrainStage, terrainContainer, gameObjectStage);
    application.stage.addChild(backgroundGraphics, parallax1Stage, stage);

    return {
        get hudStage() {
            return application.stage;
        },
        parallax1Stage,
        backgroundGameObjectStage,
        terrainStage,
        pipeStage,
        gameObjectStage,
        stage,
        get applicationTicker() {
            return application.ticker;
        },
        ticker,
        camera: createCamera(stage),
        set backgroundColor(value: number) {
            backgroundGraphics.clear();
            backgroundGraphics.beginFill(value);
            backgroundGraphics.drawRect(0, 0, 256, 256);
        },
        set terrainFill(value: DisplayObject) {
            terrainContainer.removeAllChildren();
            value.mask = terrainStage;
            terrainContainer.addChild(value);
        },
        set terrainColor(color: number) {
            const graphics = new Graphics();
            graphics.beginFill(color);
            graphics.drawRect(0, 0, game.level.width, game.level.height);
            this.terrainFill = graphics;
        },
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
    game.stage.addChild(game.player);
}

function createCamera(displayObject: DisplayObject)
{
    return {
        get x() {
            return -displayObject.x;
        },
        get y() {
            return -displayObject.y;
        },
        set x(value) {
            displayObject.x = -value;
            game.parallax1Stage.x = Math.round(-value * 0.9);
        },
        set y(value) {
            displayObject.y = -value;
            game.parallax1Stage.y = Math.round(-value * 0.9);
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