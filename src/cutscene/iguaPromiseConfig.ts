import {CancellationToken} from "pissant";
import {IguaTicker} from "../utils/iguaTicker";

export class IguaPromiseConfig
{
    readonly ticker: IguaTicker;
    readonly cancellationToken: CancellationToken;

    constructor(ticker, cancellationToken?: CancellationToken)
    {
        this.ticker = ticker;
        this.cancellationToken = cancellationToken ?? new CancellationToken();
    }
}