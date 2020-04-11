import * as PIXI from "pixi.js";
import {areRectanglesOverlapping} from "./math";

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

// Below are utilities, do not worry about them

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