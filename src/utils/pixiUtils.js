// Use this method to start a PIXI application
import {advanceKeyListener, startKeyListener} from "./key";
import * as PIXI from "pixi.js";

export function startApplication(options)
{
    if (options.mode === 'retro game')
    {
        // noinspection JSConstantReassignment
        PIXI.settings.ROUND_PIXELS = true;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    }

    const app = createApplication(options);

    if (options.targetFps)
        app.ticker.maxFPS = options.targetFps;

    addApplicationToDocument(app);
    return app;
}

// Move this Container by the given speed without touching any of the specified container(s). If a collision did not occur, the supplied speed will be modified with the remainder. Otherwise, the speed will have a length of 0.
PIXI.Container.prototype.moveUntilCollides = function (speed, otherContainerOrContainers)
{
    return moveUntilCollides(this, speed, otherContainerOrContainers);
}

// Test if this container collides with any of the specified containers taking into account the offset, if specified
PIXI.Container.prototype.collides = function(otherContainerOrContainers, offset)
{
    return collides(this, otherContainerOrContainers, offset);
}

// Use linear filtering for this
PIXI.Container.prototype.useLinearFiltering = function()
{
    useFiltering(this, PIXI.SCALE_MODES.LINEAR);
}

// Use nearest filtering for this
PIXI.Container.prototype.useNearestFiltering = function()
{
    useFiltering(this, PIXI.SCALE_MODES.NEAREST);
}

// Linearly interpolate a to b by factor
Math.lerp = function (a, b, factor)
{
    return a * (1 - factor) + b * factor;
}

// Load a Google font
function loadGoogleFont(fontFamilyName)
{
    const reloadFontTextures = () => {
        getAllChildrenOfApplications()
            .filter(isText)
            .filter(x => x.style.fontFamily === fontFamilyName)
            .forEach(triggerFontTextureReload);
    };

    WebFont.load({
        google: {
            families: [ fontFamilyName ]
        },
        active: reloadFontTextures,
        inactive: reloadFontTextures
    });
}

// If our game is embedded in an iframe (like when we publish to itch.io), we will need this so that the user doesn't need to click the game for keyboard input to work:
window.onload = () => window.focus();

// Below are utilities, do not worry about them

function triggerFontTextureReload(text)
{
    const fontFamily = text.style.fontFamily;
    text.style.fontFamily = "Not a font";
    text.style.fontFamily = fontFamily;
}

function isText(object)
{
    return object instanceof PIXI.Text;
}

function getAllChildrenOfApplications()
{
    const list = [];
    applications.forEach(x => getAllChildren(x.stage).forEach(x => list.push(x)));
    return list;
}

function getAllChildren(container, list = [])
{
    container.children.forEach(x => list.push(x));
    if (container.children && Array.isArray(container.children))
        container.children.forEach(x => getAllChildren(x, list));

    return list;
}

function useFiltering(object, scaleModeValue)
{
    if (object.scaleMode !== undefined)
    {
        object.scaleMode = scaleModeValue;
        return;
    }
    if (object.baseTexture)
        return useFiltering(object.baseTexture, scaleModeValue);
    if (object.texture)
        return useFiltering(object.texture, scaleModeValue);
}

function moveUntilCollides(container, speed, otherContainerOrContainers)
{
    const signX = Math.sign(speed.x);
    const signY = Math.sign(speed.y);

    while (Math.abs(speed.x) >= 1 || Math.abs(speed.y) >= 1)
    {
        if (Math.abs(speed.x) >= 1)
        {
            if (container.collides(otherContainerOrContainers, { x: signX, y: 0 }))
            {
                speed.x = 0;
            }
            else
            {
                container.x += signX;
                speed.x -= signX;
            }
        }
        if (Math.abs(speed.y) >= 1)
        {
            if (container.collides(otherContainerOrContainers, { x: 0, y: signY }))
            {
                speed.y = 0;
            }
            else
            {
                container.y += signY;
                speed.y -= signY;
            }
        }
    }
}

function collides(container, otherContainerOrContainers, offset)
{
    if (Array.isArray(otherContainerOrContainers))
    {
        for (let i = 0; i < otherContainerOrContainers.length; i++)
        {
            if (collides(container, otherContainerOrContainers[i], offset))
                return true;
        }

        return false;
    }

    const containerBounds = container.getBounds();
    if (offset)
    {
        containerBounds.x += offset.x;
        containerBounds.y += offset.y;
    }
    const otherContainerBounds = otherContainerOrContainers.getBounds();
    return areRectanglesOverlapping(containerBounds, otherContainerBounds);
}

function areRectanglesOverlapping(a, b)
{
    return a.x + a.width > b.x
        && a.x < b.x + b.width
        && a.y + a.height > b.y
        && a.y < b.y + b.height;
}

function createApplication(options)
{
    const app = new PIXI.Application(options);
    startKeyListener();
    app.ticker.add(advanceKeyListener);
    applications.push(app);
    return app;
}

let applications = [];

function addApplicationToDocument(app)
{
    app.view.id = "gameCanvas";
    document.body.appendChild(app.view);
}