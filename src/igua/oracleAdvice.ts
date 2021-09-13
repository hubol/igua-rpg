import {progress} from "./data/progress";
import {show} from "../cutscene/dialog";

export async function oracleAdvice() {
    if (!progress.flags.oracle.lore1) {
        progress.flags.oracle.lore1 = true;
        await show(`Long ago, our ancient protectors left us a special weapon. But over the ages, its exact location has fallen into obscurity.`);
        await show(`Throughout the world are monuments to the protectors. If you visit them all, perhaps the great weapon can be found.`);
        await show(`Go to the temple in the east desert.`);
        return;

        // await show(`Centuries ago, the world was protected by great beings.`);
        // await show(`Disaster fell when the protectors were rendered vulnerable and approached by a ferocious interloper.`);
        // await show(`Dedicated to maintaining the peace, they had already sealed away the great weapon, and could not defend themselves.`);
        // await show(`The interloper celebrated a temporary success.`);
        // await show(`But without its protectors, the world succumbed to the harsh, unadultered elements.`);
        // await show(`Intense fires, floods, winds. Only those who could bury themselves survived.`);
        // await show(`That is the history.`);
        // await show(`Today, you can find a monument to one of the protectors in the desert.`);
    }
    await show("I don't have any advice right now.");
}
