export class CancellationToken
{
    private static _counter = 0;
    private _isCancelled = false;
    private readonly _uid = CancellationToken._counter++;

    public cancel()
    {
        this._isCancelled = true;
    }

    public get isCancelled()
    {
        return this._isCancelled;
    }

    public throwIfCancelled()
    {
        if (this.isCancelled)
            throw { message: "Cancelled by token", cancellationToken: this };
    }
}

export function makeCancellablePromiseFactory<T>(cancellationToken: CancellationToken): PromiseFactory<T>
{
    return executor => new Promise<T>((resolve, reject) => {
        cancellationToken.throwIfCancelled();
        const resolve2 = () => {
            cancellationToken.throwIfCancelled();
            resolve();
        };
        executor(resolve2, reject);
    });
}

export type PromiseExecutor<T> = (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;
export type PromiseFactory<T> = (executor: PromiseExecutor<T>) => Promise<T>;

export function getDefaultPromiseFactory<T>(): PromiseFactory<T>
{
    return executor => new Promise<T>(executor);
}

export function handlePromiseCancellation(ev: PromiseRejectionEvent) {
    if (!ev?.reason?.cancellationToken)
        return;

    console.log(ev.promise, "cancelled by", ev.reason.cancellationToken);
    ev.preventDefault();
}