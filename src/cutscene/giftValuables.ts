import {progress} from "../igua/data/progress";
import {show} from "./dialog";
import {CollectValuable, CollectValuableSmall} from "../sounds";
import {sleep} from "./sleep";

export async function giftValuables(amount: number) {
    progress.valuables += amount;
    await Promise.all([playValuableCollectSounds(amount), sleep(750)]);
    await show(`Received ${amount} valuables.`);
}

async function playValuableCollectSounds(amount: number) {
    while (amount >= 15) {
        CollectValuable.play();
        await sleep(67);
        amount -= 15;
    }
    while (amount > 0) {
        CollectValuableSmall.play();
        await sleep(67);
        amount -= 5;
    }
}