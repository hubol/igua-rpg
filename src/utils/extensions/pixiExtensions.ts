import {Vector} from "../math/vector";
import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {game} from "../../igua/game";
import {makePromiseLibrary, PromiseLibrary} from "../../cutscene/promiseLibrary";
import {CancellationToken} from "pissant";
import {IguaPromiseConfig} from "../../cutscene/iguaPromiseConfig";
import {areRectanglesOverlapping, normalizeRectangle, rectangle as createRectangle} from "../math/rectangle";
import {AsshatTicker} from "../asshatTicker";

declare global {
    namespace PIXI {
        export interface DisplayObject {
            moveUntilCollides(speed: Vector, displayObjects: DisplayObject | DisplayObject[]);
            collides(displayObjects: DisplayObject | DisplayObject[], offset?: Vector);
            useLinearFiltering();
            useNearestFiltering();
            rectangle: Rectangle;
            withStep(step: () => void): this;
            withAsync(async: (p: PromiseLibrary) => Promise<unknown>): this;
            at(vector: Vector): this;
            at(x: number, y: number): this;
            destroyed: boolean;
            ticker: AsshatTicker;
        }

        export interface Container {
            removeAllChildren();
            addChild<T extends DisplayObject>(child: T): T;
            withTicker(ticker: AsshatTicker): this;
        }
    }
}

Object.defineProperty(PIXI.DisplayObject.prototype, "rectangle", {
    get: function rectangle() {
        if (!this.anchor)
            return normalizeRectangle(createRectangle(this));
        return normalizeRectangle({ x: this.x - this.width * this.anchor.x, y: this.y - this.height * this.anchor.y, width: this.width, height: this.height });
    }
});

Object.defineProperty(PIXI.DisplayObject.prototype, "destroyed", {
    get: function destroyed() {
        return this._destroyed;
    }
});

Object.defineProperty(PIXI.DisplayObject.prototype, "ticker", {
    get: function ticker() {
        if (this._ticker)
            return this._ticker;

        if (this.parent)
            this._ticker = this.parent.ticker;

        if (!this._ticker)
            this._ticker = game.ticker;

        return this._ticker;
    }
});

function doNowOrOnAdded<T extends PIXI.DisplayObject>(displayObject: T, onAdded: () => void): T
{
    if (displayObject.parent)
        onAdded();
    return displayObject.on("added", onAdded);
}

PIXI.Container.prototype.withTicker = function(ticker)
{
    (this as any)._ticker = ticker;
    return this;
}

PIXI.DisplayObject.prototype.withStep = function(step)
{
    return doNowOrOnAdded(this, () => this.ticker.add(step))
        .on("removed", () => this.ticker.remove(step));
}

PIXI.DisplayObject.prototype.withAsync = function(promiseSupplier)
{
    const cancellationToken = new CancellationToken();
    const thisDisplayObject = this;

    return doNowOrOnAdded(this, () => setTimeout(async () => {
            try
            {
                const promiseLibrary = makePromiseLibrary(new IguaPromiseConfig(this.ticker, cancellationToken));
                await promiseSupplier(promiseLibrary);
            }
            catch (e)
            {
                throw { ...e, thisDisplayObject };
            }
            finally
            {
                cancellationToken.cancel();
            }
        }))
        .on("removed", () => cancellationToken.cancel());
}

PIXI.DisplayObject.prototype.at = function(x: Vector | number, y?: number)
{
    if (typeof x === "number")
        this.position.set(x, y);
    else
        this.position.set(x.x, x.y);
    return this;
}

PIXI.Container.prototype.removeAllChildren = function ()
{
    this.children.forEach(x => {
        if (x instanceof PIXI.Container)
            x.removeAllChildren();
    });

    this.removeChildren();
}

// Move this Container by the given speed without touching any of the specified container(s). If a collision did not occur, the supplied speed will be modified with the remainder. Otherwise, the speed will have a length of 0.
PIXI.DisplayObject.prototype.moveUntilCollides = function (speed, otherContainerOrContainers)
{
    return moveUntilCollides(this, speed, otherContainerOrContainers);
}

// Test if this container collides with any of the specified containers taking into account the offset, if specified
PIXI.DisplayObject.prototype.collides = function(otherContainerOrContainers, offset)
{
    return collides(this, otherContainerOrContainers, offset);
}

// Use linear filtering for this
PIXI.DisplayObject.prototype.useLinearFiltering = function()
{
    useFiltering(this, PIXI.SCALE_MODES.LINEAR);
}

// Use nearest filtering for this
PIXI.DisplayObject.prototype.useNearestFiltering = function()
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

export default 0;