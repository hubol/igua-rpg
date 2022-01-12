export class EscapeTickerAndExecute
{
    constructor(readonly execute: () => void) { }
}

type AsshatTickerFn = ((...params: any[]) => any) & { _removed?: boolean };

export class AsshatTicker
{
    doNextUpdate = true;

    private readonly _callbacks: AsshatTickerFn[] = [];

    add(fn: AsshatTickerFn): this
    {
        this._callbacks.push(fn);
        return this;
    }

    remove(fn: AsshatTickerFn): this
    {
        fn._removed = true;
        return this;
    }

    update(): void {
        if (!this.doNextUpdate)
            return;

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
        this._callbacks.filterInPlace(x => !x._removed);

        for (const callback of this._callbacks)
        {
            if (callback._removed)
                continue;

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
