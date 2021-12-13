import {progress} from "../data/progress";
import {PotionType} from "./potions";

export const inventory = {
    slotsCount: 24,
    get usedSlotsCount() {
        return progress.inventory.filter(x => x).length;
    },
    get isFull() {
        return this.usedSlotsCount >= this.slotsCount;
    },
    get(index: number) {
        return progress.inventory[index];
    },
    remove(index: number) {
        const potion = progress.inventory[index];
        progress.inventory[index] = undefined;
        return potion;
    },
    push(potion: PotionType) {
        const freeIndex = progress.inventory.indexOf(undefined)
        if (freeIndex > -1)
            progress.inventory[freeIndex] = potion;
        else
            progress.inventory.push(potion);
    },
    count(potion: PotionType) {
        return progress.inventory.filter(x => x === potion).length;
    }
}
