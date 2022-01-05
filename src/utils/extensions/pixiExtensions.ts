import {moveTowards, Vector} from "../math/vector";
import * as PIXI from "pixi.js";
import {CancellationToken} from "pissant";
import {AsshatTicker} from "../asshatTicker";
import {PromiseFn, runInIguaZone} from "../../cutscene/runInIguaZone";
import { filters } from "pixi.js";

declare global {
    namespace PIXI {
        export interface DisplayObject {
            moveTowards(dest: Vector, speed: number);
            useLinearFiltering(): this;
            useNearestFiltering(): this;
            withStep(step: () => void): this;
            withAsync(async: PromiseFn): this;
            at(vector: Vector): this;
            at(x: number, y: number): this;
            destroyed: boolean;
            ticker: AsshatTicker;
            hueShift: number;
        }

        export interface Container {
            removeAllChildren();
            addChild<T extends DisplayObject>(child: T): T;
            withTicker(ticker: AsshatTicker): this;
        }

        export interface Transform {
            onPositionChanged(cb: () => void): this;
            onScaleChanged(cb: () => void): this;
        }
    }
}

Object.defineProperty(PIXI.DisplayObject.prototype, "destroyed", {
    get: function destroyed() {
        return this._destroyed;
    }
});

type LazyTickerReceiver = (ticker: AsshatTicker) => void;

interface LazyTicker extends AsshatTicker {
    _resolve(ticker: AsshatTicker): void;
    _addReceiver(receiver: LazyTickerReceiver): void;
    _isLazy: true;
}

const isLazyTicker = (ticker: AsshatTicker): ticker is LazyTicker => (ticker as any)._isLazy;

const lazyTickerHandler = {
    get(target, propKey) {
        if (propKey === '_resolve') {
            return function (ticker: AsshatTicker) {
                if (target._resolved) {
                    console.error(`Attempt to resolve already resolved LazyTicker`, target);
                    return;
                }
                target._queuedCalls.forEach(({ name, args }) => ticker[name](...args));
                target._receivers.forEach(fn => fn(ticker));
                target._resolved = ticker;
            }
        }
        if (propKey === '_addReceiver') {
            return function (receiver) {
                if (target._resolved) {
                    console.error(`Attempt to add receiver to already-resolved LazyTicker`, target, receiver);
                    return;
                }
                target._receivers.push(receiver);
            }
        }

        return function (...args) {
            if (target._resolved) {
                return target._resolved[propKey](...args);
            }
            target._queuedCalls.push({ name: propKey, args })
        };
    }
};

function createLazyTicker(): LazyTicker {
    return new Proxy({ _resolved: false, _receivers: [], _queuedCalls: [] }, lazyTickerHandler);
}

Object.defineProperty(PIXI.DisplayObject.prototype, "ticker", {
    get: function ticker() {
        if (this._ticker)
            return this._ticker;

        if (this.parent) {
            const maybeTicker = this.parent.ticker;
            if (!isLazyTicker(maybeTicker))
                return this._ticker = maybeTicker;

            if (this._lazyTicker)
                return this._lazyTicker;

            maybeTicker._addReceiver(ticker => {
                this._ticker = ticker;
                delete this._lazyTicker;
            });
            return this._lazyTicker = maybeTicker;
        }

        const lazyTicker = createLazyTicker();
        lazyTicker._addReceiver(ticker => {
            this._ticker = ticker;
            delete this._lazyTicker;
        });
        this.on('added', () => {
            const parentTicker = this.parent.ticker;
            if (isLazyTicker(parentTicker))
                parentTicker._addReceiver(lazyTicker._resolve);
            else
                lazyTicker._resolve(parentTicker);
        });
        return this._lazyTicker = lazyTicker;
    }
});

export function doNowOrOnAdded<T extends PIXI.DisplayObject>(displayObject: T, onAdded: () => void): T
{
    if (displayObject.parent)
        onAdded();
    return displayObject.on("added", onAdded);
}

Object.defineProperties(PIXI.DisplayObject.prototype, {
    hueShift: {
        get: function () {
            return this.__hueShiftAngle ?? 0;
        },
        set: function (angle) {
            this.__hueShiftAngle = angle;
            if (this.__hueShiftFilter) {
                this.__hueShiftFilter.reset();
                this.__hueShiftFilter.hue(angle);
                return this;
            }
            const colorMatrixFilter = new filters.ColorMatrixFilter();
            colorMatrixFilter.hue(angle, false);
            if (!this.filters) this.filters = [];
            this.filters.push(colorMatrixFilter);
            this.__hueShiftFilter = colorMatrixFilter;
        },
        enumerable: false,
        configurable: true,
    },
});

PIXI.Container.prototype.withTicker = function(ticker)
{
    (this as any)._ticker = ticker;
    (this as any)._lazyTicker?._resolve(ticker);
    return this;
}

PIXI.DisplayObject.prototype.moveTowards = function(other, speed)
{
    moveTowards(this, other, speed);
}

PIXI.DisplayObject.prototype.withStep = function(step)
{
    return doNowOrOnAdded(this, () => this.ticker.add(step))
        .on("removed", () => this.ticker.remove(step));
}

PIXI.DisplayObject.prototype.withAsync = function(promiseFn)
{
    const cancellationToken = new CancellationToken();
    const thisDisplayObject = this;

    return doNowOrOnAdded(this, async () => {
        try
        {
            await runInIguaZone(`${thisDisplayObject.constructor.name}.withAsync`, promiseFn, { ticker: this.ticker, cancellationToken });
        }
        catch (e)
        {
            throw e;
        }
        finally
        {
            cancellationToken.cancel();
        }
    })
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

PIXI.DisplayObject.prototype.useLinearFiltering = function()
{
    useFiltering(this, PIXI.SCALE_MODES.LINEAR);
    return this;
}

PIXI.DisplayObject.prototype.useNearestFiltering = function()
{
    useFiltering(this, PIXI.SCALE_MODES.NEAREST);
    return this;
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

PIXI.Transform.prototype.onPositionChanged = function(cb) {
    (this.position as any).cb = () => { cb(); (this as any).onChange(); };
    return this;
}

PIXI.Transform.prototype.onScaleChanged = function(cb) {
    (this.scale as any).cb = () => { cb(); (this as any).onChange(); };
    return this;
}

export default 0;
