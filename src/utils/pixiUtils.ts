import {Application} from "pixi.js";

type ApplicationOptions = ConstructorParameters<typeof Application>[0] & { targetFps: number };

export function startApplication(options: ApplicationOptions)
{
    const app = new Application(options);

    if (options.targetFps)
        app.ticker.maxFPS = options.targetFps;

    addApplicationToDocument(app);
    return app;
}

function addApplicationToDocument(app)
{
    app.view.id = "gameCanvas";
    document.body.appendChild(app.view);
}