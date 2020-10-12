import {CancellationToken} from "pissant";
import {AsshatTicker} from "../utils/asshatTicker";

export class IguaPromiseConfig
{
    readonly ticker: AsshatTicker;
    readonly cancellationToken: CancellationToken;

    constructor(ticker, cancellationToken?: CancellationToken)
    {
        this.ticker = ticker;
        this.cancellationToken = cancellationToken ?? new CancellationToken();
    }
}