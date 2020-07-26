import {startApplication} from "../utils/pixiUtils";
import {Container, DisplayObject, Ticker} from "pixi.js";
import {IguaTicker} from "../utils/iguaTicker";
import {stepPlayerCamera} from "./playerCamera";
import {loadLevel} from "./level";
import {Test} from "../levels";
import {player} from "../gameObjects/player";
import {advanceKeyListener, startKeyListener} from "../utils/key";
import {IguanaPuppet} from "./iguanaPuppet";

export let game: Game;

export function startGame()
{
    const application = startApplication({ width: 256, height: 256, targetFps: 60 });

    application.ticker.maxFPS = 60;
    application.ticker.start();

    const iguaTicker = new IguaTicker();

    startKeyListener();
    iguaTicker.add(advanceKeyListener);

    application.ticker.add(() => iguaTicker.update());

    const terrainStage = new Container();

    const terrainContainer = new Container();
    const pipeStage = new Container();
    const gameObjectStage = new Container();
    const stage = new Container();
    stage.addChild(pipeStage, terrainStage, terrainContainer, gameObjectStage);
    application.stage.addChild(stage);

    game = {
        get hudStage() {
            return application.stage;
        },
        terrainStage,
        pipeStage,
        gameObjectStage,
        stage,
        get applicationTicker() {
            return application.ticker;
        },
        ticker: iguaTicker,
        camera: createCamera(application.stage),
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
        player: {} as Player,
        get width() {
            return application.renderer.width;
        },
        get height() {
            return application.renderer.height;
        },
        level: {} as LevelInfo
    };

    game.player = player();
    game.ticker.add(stepPlayerCamera);

    loadLevel(Test as Ogmo.Level);

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
    };
}

interface LevelInfo
{
    width: number;
    height: number;
}

type Player = DisplayObject & IguanaPuppet;

interface Game
{
    hudStage: Container;
    pipeStage: Container;
    terrainStage: Container;
    gameObjectStage: Container;
    stage: Container;
    ticker: IguaTicker;
    applicationTicker: Ticker;
    camera: Camera;
    backgroundColor: number;
    terrainFill: DisplayObject;
    player: Player;
    width: number;
    height: number;
    level: LevelInfo
}

interface Camera
{
    x: number;
    y: number;
}