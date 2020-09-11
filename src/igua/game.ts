import {startApplication} from "../utils/pixiUtils";
import {Container, DisplayObject} from "pixi.js";
import {IguaTicker} from "../utils/iguaTicker";
import {stepPlayerCamera} from "./playerCamera";
import {player} from "../gameObjects/player";
import {advanceKeyListener, startKeyListener} from "../utils/key";
import {CutscenePlayer} from "../cutscene/cutscene";
import {Test} from "../levels/testLevel";
import {createDefaultHud} from "./createDefaultHud";
import {level} from "./level/level";

export let game: ReturnType<typeof createGame>;
function createGame()
{
    const application = startApplication({width: 256, height: 256, targetFps: 60});

    application.ticker.maxFPS = 60;
    application.ticker.start();

    const iguaTicker = new IguaTicker();

    startKeyListener();
    iguaTicker.add(advanceKeyListener);

    application.ticker.add(() => iguaTicker.update());

    const terrainStage = new Container();

    const backgroundGameObjectStage = new Container();
    const terrainContainer = new Container();
    const pipeStage = new Container();
    const gameObjectStage = new Container();
    const stage = new Container();
    stage.addChild(backgroundGameObjectStage, pipeStage, terrainStage, terrainContainer, gameObjectStage);
    application.stage.addChild(stage);

    return {
        get hudStage() {
            return application.stage;
        },
        backgroundGameObjectStage,
        terrainStage,
        pipeStage,
        gameObjectStage,
        stage,
        get applicationTicker() {
            return application.ticker;
        },
        ticker: iguaTicker,
        camera: createCamera(stage),
        get backgroundColor() {
            return application.renderer.backgroundColor;
        },
        set backgroundColor(value) {
            application.renderer.backgroundColor = value;
        },
        set terrainFill(value) {
            terrainContainer.removeAllChildren();
            value.mask = terrainStage;
            terrainContainer.addChild(value);
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

export function startGame()
{
    game = createGame();

    recreatePlayer();
    game.ticker.add(stepPlayerCamera);

    createDefaultHud();

    level.gotoSync("Test");
}

export function recreatePlayer()
{
    if (game.player?.removeAllChildren)
    {
        game.player.removeAllChildren();
        game.player.destroy();
    }
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
        },
        set y(value) {
            displayObject.y = -value;
        },
        followPlayer: true
    };
}

interface LevelInfo
{
    width: number;
    height: number;
}