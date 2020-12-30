import {IguaPromiseConfig} from "./iguaPromiseConfig";
import {Predicate} from "pissant";
import {tickerWait} from "./tickerWait";

export async function waitHold(predicate: Predicate<void>, steps: number, config?: IguaPromiseConfig)
{
    const stepsMax = steps;
    return tickerWait(() => {
            if (predicate())
                steps--;
            else
                steps = stepsMax;
            return steps <= 0;
        },
        config);
}
