import {CancellationToken} from "pissant";
import {game} from "../igua/game";
import {tickerWait} from "./tickerWait";

export function tickerSleep(ms: number, ct?: CancellationToken)
{
    let ticksUntilResolve = (ms / 1000) * game.applicationTicker.maxFPS;

    return tickerWait(() => --ticksUntilResolve <= 0, ct);
}