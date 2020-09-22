import {Application, InteractionManager} from "pixi.js";

type ApplicationOptions = ConstructorParameters<typeof Application>[0] & { targetFps?: number, showCursor?: boolean };

export type AsshatApplication = ReturnType<typeof createApplication>;

export function createApplication(options: ApplicationOptions)
{
    const app = new Application(options);

    if (options.targetFps)
        app.ticker.maxFPS = options.targetFps;

    if (options.showCursor === false)
        (app.renderer.plugins.interaction as InteractionManager).cursorStyles.default = "none";

    return {
        canvasElement: app.view,
        renderer: app.renderer,
        stage: app.stage,
        ticker: app.ticker
    };
}