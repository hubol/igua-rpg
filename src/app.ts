import {startApplication} from "./utils/pixiUtils";
import {Container, DisplayObject} from "pixi.js";
import Ticker = PIXI.Ticker;

export let app: IguaApplication;

export function startIguaApplication()
{
    const application = startApplication({ width: 256, height: 256, mode: "retro game", targetFps: 60 });
    const stage = new Container();
    application.stage.addChild(stage);

    app = {
        get hudStage() {
            return application.stage;
        },
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
            displayObject.x = -value;
        },
    };
}

interface IguaApplication
{
    hudStage: Container;
    stage: Container;
    ticker: Ticker;
    camera: Camera;
    backgroundColor: number;
}

interface Camera
{
    x: number;
    y: number;
}