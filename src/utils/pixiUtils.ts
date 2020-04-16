import {advanceKeyListener, startKeyListener} from "./key";
import * as PIXI from "pixi.js";
import DisplayObject = PIXI.DisplayObject;
import Container = PIXI.Container;

export function startApplication(options)
{
    const app = createApplication(options);

    if (options.targetFps)
        app.ticker.maxFPS = options.targetFps;

    addApplicationToDocument(app);
    return app;
}

function getAllChildrenOfApplications()
{
    const list = [];
    applications.forEach(x => getAllChildren(x.stage).forEach(x => list.push(x)));
    return list as DisplayObject[];
}

function getAllChildren(container, list = [])
{
    // @ts-ignore
    container.children.forEach(x => list.push(x));
    if (container.children && Array.isArray(container.children))
        container.children.forEach(x => getAllChildren(x as Container, list));

    return list;
}

export function createApplication(options)
{
    const app = new PIXI.Application(options);
    startKeyListener();
    app.ticker.add(advanceKeyListener);
    applications.push(app);
    return app;
}

const applications: PIXI.Application[] = [];

function addApplicationToDocument(app)
{
    app.view.id = "gameCanvas";
    document.body.appendChild(app.view);
}