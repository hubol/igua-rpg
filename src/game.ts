import {startApplication} from "./utils/pixiUtils";
import {Container, DisplayObject} from "pixi.js";
import Ticker = PIXI.Ticker;

export let game: Game;

export function startGame()
{
    const application = startApplication({ width: 256, height: 256, mode: "retro game", targetFps: 60 });
    const terrainStage = new Container();

    const terrainContainer = new Container();
    const pipeStage = new Container();
    const stage = new Container();
    stage.addChild(pipeStage, terrainStage, terrainContainer);
    application.stage.addChild(stage);

    game = {
        get hudStage() {
            return application.stage;
        },
        terrainStage,
        pipeStage,
        stage,
        get ticker() {
          return application.ticker;
        },
        camera: createCamera(application.stage),
        get backgroundColor() {
            return application.renderer.backgroundColor;
        },
        set backgroundColor(value) {
            application.renderer.backgroundColor = value;
        },
        set terrainFill(value) {
            terrainContainer.removeChildren();
            value.mask = terrainStage;
            terrainContainer.addChild(value);
        },
        player: undefined,
        get width() {
            return application.renderer.width;
        },
        get height() {
            return application.renderer.height;
        },
        level: {
            width: 300,
            height: 800
        }
    };
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

interface Game
{
    hudStage: Container;
    pipeStage: Container;
    terrainStage: Container;
    stage: Container;
    ticker: Ticker;
    camera: Camera;
    backgroundColor: number;
    terrainFill: DisplayObject;
    player: DisplayObject & any;
    width: number;
    height: number;
    level: { width: number; height: number; }
}

interface Camera
{
    x: number;
    y: number;
}