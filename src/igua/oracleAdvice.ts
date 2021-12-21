import {progress} from "./data/progress";
import {show} from "../cutscene/dialog";

export async function oracleAdvice() {
    if (!progress.flags.oracle.lore1) {
        progress.flags.oracle.lore1 = true;
        await show(`Long ago, our ancient protectors left us a special weapon. But over the ages, its exact location has fallen into obscurity.`);
        await show(`Throughout the world are monuments to the protectors. If you visit them all, perhaps the great weapon can be found.`);
        return await show(`Go to the temple in the east desert.`);

        // await show(`Centuries ago, the world was protected by great beings.`);
        // await show(`Disaster fell when the protectors were rendered vulnerable and approached by a ferocious interloper.`);
        // await show(`Dedicated to maintaining the peace, they had already sealed away the great weapon, and could not defend themselves.`);
        // await show(`The interloper celebrated a temporary success.`);
        // await show(`But without its protectors, the world succumbed to the harsh, unadultered elements.`);
        // await show(`Intense fires, floods, winds. Only those who could bury themselves survived.`);
        // await show(`That is the history.`);
        // await show(`Today, you can find a monument to one of the protectors in the desert.`);
    }
    else if (!progress.flags.desert.unlockedTemple) {
        await show(`You must go to the temple in the east desert, but alas, it is locked.`);
        return await show(`There is a mechanism to open the temple somewhere in the outskirts of the desert.`);
    }
    else if (progress.flags.desert.bigKey.reward) {
        await show(`You repaired the big key and received the blessing of earth!`);
        return await show(`Hurry to the jungle through the west tunnel!`);
    }
    else if (progress.flags.desert.unlockedTemple) {
        await show(`I see that you have unlocked the desert temple.`);
        const allKeys = progress.flags.desert.key.fromTopOfCrateStack && progress.flags.desert.key.fromInn && progress.flags.desert.key.fromDiggingInTown;
        if (allKeys) {
            return await show(`You need to restore the big key by entering the unreal worlds.`);
        }
        else {
            await show(`You will need to acquire some keys to continue.`);
            if (!progress.flags.desert.key.fromInn) {
                return await show(`One is in the desert inn.`);
            }
            if (!progress.flags.desert.key.fromTopOfCrateStack) {
                await show(`One is above the desert town.`);
                return await show(`Assist the laborer iguana to reveal your prize.`);
            }
            if (!progress.flags.desert.key.fromDiggingInTown) {
                await show(`One is under the desert town.`);
                return await show(`You'll need to find someone with a special digging ability to help you.`);
            }
        }
        return;
    }
    await show("I don't have any advice right now.");
}
