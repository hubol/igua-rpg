import {CancellationToken} from "pissant";
import {AsshatTicker} from "../utils/asshatTicker";

export class IguaPromiseConfig
{
    readonly cancellationToken: CancellationToken;

    constructor(readonly ticker, cancellationToken?: CancellationToken)
    {
        this.cancellationToken = cancellationToken ?? new CancellationToken();
    }
}