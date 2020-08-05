export class CancellationToken
{
    private static _counter = 0;
    private _isCancelled = false;
    private _uid = CancellationToken._counter++;

    public cancel()
    {
        this._isCancelled = true;
    }

    public get isCancelled()
    {
        return this._isCancelled;
    }
}

export function makeCancellablePromiseFactory<T>(cancellationToken: CancellationToken): PromiseFactory<T>
{
    return executor => new Promise<T>((resolve, reject) => {
        if (cancellationToken.isCancelled)
            reject({ message: "Cancelled by token", cancellationToken });
        const resolve2 = () => {
            if (cancellationToken.isCancelled)
                reject({ message: "Cancelled by token", cancellationToken });
            resolve();
        }
        executor(resolve2, reject);
    });
}

export type PromiseExecutor<T> = (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;
export type PromiseFactory<T> = (executor: PromiseExecutor<T>) => Promise<T>;

export function getDefaultPromiseFactory<T>(): PromiseFactory<T>
{
    return executor => new Promise<T>(executor);
}