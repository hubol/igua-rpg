import {progress} from "../data/progress";
import {potions} from "../inventory/potions";

export function devProgress()
{
    progress.flags.desert.heardIntroduction = true;
    progress.flags.desert.stackedAllCrates = true;
    // progress.flags.desert.unlockedTemple = true;
    progress.flags.desert.key.fromCrateStacker = true;
    progress.flags.desert.key.fromInn = true;
    progress.flags.desert.key.fromDiggingInTown = false;
    // progress.flags.desert.diguaIsFollowing = true;
    progress.valuables = 100;
    progress.levelName = "DesertShop";
    progress.flags.desert.bigKey.reward = true;
    progress.inventory = Object.keys(potions) as any;
    // progress.flags.diguaIsFollowing = true;
}
