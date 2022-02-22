import {progress} from "../data/progress";
import {potions, PotionType} from "./potions";

export const inventory = {
    slotsCount: 12,
    get usedSlotsCount() {
        return progress.inventory.filter(x => x).length;
    },
    get isFull() {
        return this.usedSlotsCount >= this.slotsCount;
    },
    get(index: number) {
        return progress.inventory[index];
    },
    potion(index: number) {
        const type = this.get(index);
        return type && potions[type];
    },
    remove(index: number) {
        const potion = progress.inventory[index];
        progress.inventory[index] = progress.inventory[this.slotsCount];
        progress.inventory[this.slotsCount] = undefined;
        const excess = progress.inventory.slice(this.slotsCount).filter(x => !!x);
        progress.inventory = [...progress.inventory.slice(0, this.slotsCount), ...excess];
        return potion;
    },
    push(potion: PotionType) {
        const freeIndex = progress.inventory.indexOf(undefined)
        if (freeIndex > -1)
            progress.inventory[freeIndex] = potion;
        else
            progress.inventory.push(potion);
    },
    find(potion: PotionType) {
        return progress.inventory.indexOf(potion);
    },
    count(potion: PotionType) {
        return progress.inventory.filter(x => x === potion).length;
    },
}
