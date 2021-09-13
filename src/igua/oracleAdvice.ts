import {progress} from "./data/progress";
import {show} from "../cutscene/dialog";

export async function oracleAdvice() {
    if (!progress.flags.oracle.lore1) {
        progress.flags.oracle.lore1 = true;
        await show(`Long ago, our ancient protectors left us a special weapon. But accessing the weapon is no easy task.`);
        await show(`You will have to gather 4 big keys--all in different shapes. They are shattered and hidden in rooms with doors that leads to the pieces.`);
        await show(`It won't be easy, but once all the keys are gathered, the great weapon will become available.`);
        await show(`And that is how you will save the world.`);

        // await show(`Centuries ago, the world was protected by great beings.`);
        // await show(`Disaster fell when the protectors were rendered vulnerable and approached by a ferocious interloper.`);
        // await show(`Dedicated to maintaining the peace, they had already sealed away the great weapon, and could not defend themselves.`);
        // await show(`The interloper celebrated a temporary success.`);
        // await show(`But without its protectors, the world succumbed to the harsh, unadultered elements.`);
        // await show(`Intense fires, floods, winds. Only those who could bury themselves survived.`);
        // await show(`That is the history.`);
        // await show(`Today, you can find a monument to one of the protectors in the desert.`);
    }
}
