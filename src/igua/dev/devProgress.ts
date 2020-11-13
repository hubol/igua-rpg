import {progress} from "../data/progress";

export function devProgress()
{
    progress.flags.desert.heardIntroduction = true;
    progress.flags.desert.stackedAllCrates = true;
    progress.valuables = 100;
    progress.levelName = "DesertOutskirts";
    // progress.flags.diguaIsFollowing = true;
}