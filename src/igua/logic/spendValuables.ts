import {progress} from "../data/progress";

export function spendValuables(valuables: number)
{
    if (progress.valuables >= valuables)
    {
        progress.valuables -= valuables;
        return true;
    }

    return false;
}