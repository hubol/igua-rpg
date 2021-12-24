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
    // range(12).forEach(() => progress.ballons.push(1));
    // progress.flags.desert.diguaIsFollowing = true;
    progress.valuables = 100;
    progress.poisonLevel = 0;
    progress.levelName = "DesertField";
    progress.checkpointName = "FromInnSave";
    progress.flags.desert.bigKey.reward = true;
    range(12).forEach(() => inventory.push("ClawPowder"));
    // progress.inventory = Object.keys(potions) as any;
    // progress.flags.diguaIsFollowing = true;
}
