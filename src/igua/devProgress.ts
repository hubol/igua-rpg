import {progress} from "./progress";

export function devProgress()
{
    progress.flags.heardIntroduction = true;
    progress.flags.stackedAllCrates = true;
    progress.valuables = 100;
    progress.levelName = "DesertInn";
}