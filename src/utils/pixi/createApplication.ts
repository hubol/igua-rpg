import {Application, InteractionManager} from "pixi.js";

type ApplicationOptions = ConstructorParameters<typeof Application>[0] & { maxFps: number, showCursor?: boolean };

export type AsshatApplication = ReturnType<typeof createApplication>;

export function createApplication(options: ApplicationOptions)
{
    const app = new Application(options);
    app.ticker.maxFPS = options.maxFps;

    if (options.showCursor === false)
        (app.renderer.plugins.interaction as InteractionManager).cursorStyles.default = "none";

    return {
        canvasElement: app.view,
        renderer: app.renderer,
        stage: app.stage,
        ticker: app.ticker,
        maxFps: options.maxFps
    };
}
