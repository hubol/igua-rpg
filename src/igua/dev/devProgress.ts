import {progress} from "../data/progress";

export function devProgress()
{
    progress.flags.heardIntroduction = true;
    progress.flags.stackedAllCrates = true;
    progress.valuables = 100;
    progress.levelName = "DesertInn";
}