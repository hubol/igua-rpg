import {makePromiseLibrary} from "./promiseLibrary";
import {IguaPromiseConfig} from "./iguaPromiseConfig";
import {game} from "../igua/game";

export class RecycleablePromiseLibrary
{
    private _config = new IguaPromiseConfig(game.ticker);
    private _promiseLibrary = makePromiseLibrary(this._config);

    public recycle()
    {
        this._config.cancellationToken.cancel();
        this._config = new IguaPromiseConfig(game.ticker);
        this._promiseLibrary = makePromiseLibrary(this._config);
    }

    public get promiseLibrary()
    {
        return this._promiseLibrary;
    }
}