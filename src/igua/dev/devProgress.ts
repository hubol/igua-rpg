import {progress} from "../data/progress";
import {potions} from "../inventory/potions";
import {range} from "../../utils/range";
import {inventory} from "../inventory/inventory";

export function devProgress()
{
    progress.flags.desert.heardIntroduction = true;
    progress.flags.desert.stackedAllCrates = true;
    // progress.flags.desert.unlockedTemple = true;
    // progress.flags.desert.key.fromTopOfCrateStack = true;
    progress.flags.desert.key.fromInn = true;
    progress.flags.desert.key.fromDiggingInTown = true;
    // progress.flags.desert.bigKey.reward = true;

    // progress.flags.desert.costumeMirror.shardCollected = true;
    progress.flags.desert.costumeMirror.repaired = true;
    // progress.health = 1;
    // range(1).forEach(() => progress.ballons.push(1));
    // progress.flags.desert.diguaIsFollowing = true;
    // progress.valuables = 100;
    // progress.poisonLevel = 4;
    // progress.levelName = "ChooseYourLooksDev";
    progress.levelName = "JungleFromDesert";
    progress.checkpointName = "FromShop";
    progress.level = 3;
    // progress.flags.desert.bigKey.reward = true;
    range(12).forEach(() => inventory.push("CommonPoison"));
    // progress.inventory = Object.keys(potions) as any;
    // progress.flags.diguaIsFollowing = true;
}
