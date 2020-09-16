import {Application} from "pixi.js";

type ApplicationOptions = ConstructorParameters<typeof Application>[0] & { targetFps: number };

export function createApplication(options: ApplicationOptions)
{
    const app = new Application(options);

    if (options.targetFps)
        app.ticker.maxFPS = options.targetFps;

    return {
        canvasElement: app.view,
        renderer: app.renderer,
        stage: app.stage,
        ticker: app.ticker
    };
}