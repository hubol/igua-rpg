import {makePromiseLibrary} from "./promiseLibrary";
import {IguaPromiseConfig} from "./iguaPromiseConfig";
import {game} from "../igua/game";
import {AsshatTicker} from "../utils/asshatTicker";

export class RecycleablePromiseLibrary
{
    private readonly _ticker: AsshatTicker;

    constructor(ticker?: AsshatTicker)
    {
        this._ticker = ticker ?? game.ticker;
    }

    private _config = new IguaPromiseConfig(this._ticker);
    private _promiseLibrary = makePromiseLibrary(this._config);

    recycle()
    {
        this._config.cancellationToken.cancel();
        this._config = new IguaPromiseConfig(this._ticker);
        this._promiseLibrary = makePromiseLibrary(this._config);
    }

    get promiseLibrary()
    {
        return this._promiseLibrary;
    }
}