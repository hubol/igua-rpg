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

    public rejectIfCancelled(reject: (reason?: any) => void)
    {
        if (this.isCancelled)
            reject({ message: "Cancelled by token", cancellationToken: this });
    }
}

export function handlePromiseCancellation(ev: PromiseRejectionEvent)
{
    if (!ev?.reason?.cancellationToken)
        return;

    console.log(ev.promise, ev.reason);
    ev.preventDefault();
}