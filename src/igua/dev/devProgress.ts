import {progress} from "../data/progress";

export function devProgress()
{
    progress.flags.desert.heardIntroduction = true;
    progress.flags.desert.stackedAllCrates = true;
    progress.flags.desert.unlockedTemple = true;
    progress.flags.desert.thankedByCrateStacker = true;
    // progress.flags.desert.diguaIsFollowing = true;
    progress.valuables = 100;
    progress.levelName = "UnrealFlight";
    // progress.flags.diguaIsFollowing = true;
}