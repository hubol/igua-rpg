import {makePromiseLibrary} from "./promiseLibrary";
import {CancellationToken} from "pissant";

export class RecycleablePromiseLibrary
{
    private _cancellationToken = new CancellationToken();
    private _promiseLibrary = makePromiseLibrary(this._cancellationToken);

    public recycle()
    {
        this._cancellationToken.cancel();
        this._cancellationToken = new CancellationToken();
        this._promiseLibrary = makePromiseLibrary(this._cancellationToken);
    }

    public get promiseLibrary()
    {
        return this._promiseLibrary;
    }
}