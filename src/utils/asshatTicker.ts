export class EscapeTickerAndExecute
{
    constructor(readonly execute: () => void) { }
}

type AsshatTickerFn = () => void;

export class AsshatTicker
{
    private readonly _callbacks: AsshatTickerFn[] = [];
    private _callbacksToRemove: AsshatTickerFn[] = [];

    add(fn: (...params: any[]) => any): this
    {
        this._callbacks.push(fn);
        return this;
    }

    remove(fn: (...params: any[]) => any): this
    {
        this._callbacksToRemove.push(fn);
        return this;
    }

    update(): void {
        try
        {
            this.updateImpl();
        }
        catch (e)
        {
            if (e instanceof EscapeTickerAndExecute) {
                e.execute();
                return;
            }
            console.error(`Unhandled error in AsshatTicker.update: ${e}`);
        }
    }

    private updateImpl(): void
    {
        for (let i = 0, len = this._callbacksToRemove.length; i < len; i++)
            this._callbacks.removeFirst(this._callbacksToRemove[i]);
        this._callbacksToRemove.length = 0;

        for (let i = 0, len = this._callbacks.length; i < len; i++)
        {
            const callback = this._callbacks[i];

            try
            {
                callback();
            }
            catch (e)
            {
                if (e instanceof EscapeTickerAndExecute)
                    throw e;
                console.error(`Unhandled error while emitting listener`, callback, e);
            }
        }
    }
}