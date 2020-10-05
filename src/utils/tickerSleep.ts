import {game} from "../igua/game";
import {tickerWait} from "./tickerWait";
import {IguaPromiseConfig} from "../cutscene/iguaPromiseConfig";

export function tickerSleep(ms: number, config?: IguaPromiseConfig)
{
    let ticksUntilResolve = (ms / 1000) * game.applicationTicker.maxFPS;

    return tickerWait(() => --ticksUntilResolve <= 0, config);
}