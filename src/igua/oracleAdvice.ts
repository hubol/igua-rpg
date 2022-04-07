import {progress} from "./data/progress";
import {show} from "../cutscene/dialog";

export async function oracleAdviceDesert() {
    const { oracle, desert } = progress.flags;
    if (!oracle.lore1) {
        oracle.lore1 = true;
        await show(`Long ago, our ancient protectors left us a special weapon. But over the ages, its exact location has fallen into obscurity.`);
        await show(`Throughout the world are monuments to the protectors. If you visit them all, perhaps the great weapon can be found.`);
        if (!desert.unlockedTemple)
            await show(`Go to the temple in the east desert.`);
        return;

        // await show(`Centuries ago, the world was protected by great beings.`);
        // await show(`Disaster fell when the protectors were rendered vulnerable and approached by a ferocious interloper.`);
        // await show(`Dedicated to maintaining the peace, they had already sealed away the great weapon, and could not defend themselves.`);
        // await show(`The interloper celebrated a temporary success.`);
        // await show(`But without its protectors, the world succumbed to the harsh, unadulterated elements.`);
        // await show(`Intense fires, floods, winds. Only those who could bury themselves survived.`);
        // await show(`That is the history.`);
        // await show(`Today, you can find a monument to one of the protectors in the desert.`);
    }
    else {
        if (!desert.unlockedTemple) {
                await show(`You must go to the temple in the east desert, but alas, it is locked.`);
                return await show(`There is a mechanism to open the temple in the grassy outskirts of the desert.`);
            }
            else if (desert.bigKey.reward) {
                await show(`You repaired the big key and received the blessing of earth!`);
                return await show(`Hurry to the jungle through the west tunnel!`);
            }
            else if (desert.unlockedTemple) {
                if (!oracle.discussedOpeningDesertTemple) {
                    await show(`I see that you have unlocked the desert temple.`);
                    oracle.discussedOpeningDesertTemple = true;
                }
                const allKeys = desert.key.fromTopOfCrateStack && desert.key.fromInn && desert.key.fromDiggingInTown;
                if (allKeys) {
                    await show(`You need to find the big key pieces by entering the unreal worlds.`);
                    if (!desert.bigKey.piece1) {
                        await show(`You'll need to navigate a green maze to find one piece.`);
                        return await show(`If necessary, look up for a firefly who can help you through the maze.`);
                    }
                    if (!desert.bigKey.piece2) {
                        return await show(`One piece requires you to imitate a shadow.`);
                    }
                    if (!desert.bigKey.piece3) {
                        await show(`One piece requires you to defeat a snow angel.`);
                        return await show(`While immune to your claws, it does not appreciate a fiery torch.`);
                    }
                }
                else {
                    await show(`You will need to acquire some keys to continue.`);
                    if (!desert.key.fromInn) {
                        return await show(`One is in the desert inn.`);
                    }
                    if (!desert.key.fromTopOfCrateStack) {
                        await show(`One is above the desert town.`);
                        return await show(`Assist the laborer iguana to reveal your prize.`);
                    }
                    if (!desert.key.fromDiggingInTown) {
                        await show(`One is under the desert town.`);
                        return await show(`You'll need to find someone with a special digging ability to help you.`);
                    }
                }
                return;
            }
    }
    await show("I don't have any advice right now.");
}

export async function oracleAdviceJungle() {
    const { jungle } = progress.flags;
    if (jungle.bigKey.reward) {

    }

    const allKeys = jungle.key.fromSickIguana && jungle.key.fromBiguaRepair && jungle.key.fromSpider;
    if (allKeys) {
        await show(`You need to find the big key pieces by entering the unreal worlds.`);
        if (!jungle.bigKey.piece1) {
            return await show(`One piece requires you to dodge common angels.`);
        }
        if (!jungle.bigKey.piece2) {
            return await show(`One piece requires you to defend yourself.`);
        }
        if (!jungle.bigKey.piece3) {
            return await show(`One piece requires you to destroy a ball.`);
        }
    }
    else {
        await show(`You will need to acquire some keys to continue your mission.`);
        if (!jungle.key.fromSickIguana) {
            return await show(`One is with a sick iguana in the jungle.`);
        }
        if (!jungle.key.fromBiguaRepair) {
            if (!jungle.key.shrunkenKey)
                return await show(`A damaged one is above the jungle town.`);
            if (!jungle.bigua.met) {
                await show(`The damaged one can be repaired by the jungle's fallen sorcerer.`);
                return await show(`The sorcerer waits on top of the earth pillar.`);
            }
            return await show(`Take the damaged key to Bigua of the jungle.`);
        }
        if (!jungle.key.fromSpider) {
            return await show(`One is monitored closely by a cautious spider.`);
        }
    }

    await show("I don't have any advice right now.");
}
