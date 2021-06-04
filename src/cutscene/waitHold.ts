import {Predicate} from "pissant";
import {wait} from "./wait";

export async function waitHold(predicate: Predicate<void>, steps: number)
{
    const stepsMax = steps;
    return wait(() => {
            if (predicate())
                steps--;
            else
                steps = stepsMax;
            return steps <= 0;
        });
}
