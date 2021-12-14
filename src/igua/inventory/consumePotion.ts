import {inventory} from "./inventory";
import {PotionType} from "./potions";
import {progress} from "../data/progress";

export function consumePotion(index: number) {
    const potion = inventory.get(index);
    if (!potion)
        return;
    consumePotionImpl(potion);
    inventory.remove(index);
}

function consumePotionImpl(potion: PotionType) {
    // TODO
    switch (potion) {
        case "WonderBallon":
            break;
        case "CommonPoison":
            break;
        case "SpicedNectar":
            progress.maxHealth += 15;
            break;
        case "BitterMedicine":
            break;
        case "SweetBerry":
            progress.health = Math.min(progress.maxHealth, progress.health + progress.maxHealth * .334);
            break;
        case "ClawPowder":
            progress.level += 1;
            break;

    }
}
