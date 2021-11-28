import {progress} from "../data/progress";

export function devProgress()
{
    progress.flags.desert.heardIntroduction = true;
    progress.flags.desert.stackedAllCrates = true;
    // progress.flags.desert.unlockedTemple = true;
    progress.flags.desert.key.fromCrateStacker = true;
    progress.flags.desert.key.fromInn = true;
    progress.flags.desert.key.fromDiggingInTown = true;
    // progress.flags.desert.diguaIsFollowing = true;
    progress.valuables = 100;
    progress.levelName = "DesertInn";
    // progress.flags.diguaIsFollowing = true;
}
