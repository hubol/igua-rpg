import {inventory} from "./inventory";
import {PotionType} from "./potions";
import {progress} from "../data/progress";
import {ConsumeBallon, ConsumeBerry, ConsumeElixir, ConsumeMedicine, ConsumePoison, ConsumePowder} from "../../sounds";

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
            ConsumeBallon.play();
            break;
        case "CommonPoison":
            ConsumePoison.play();
            progress.poisonLevel += 1;
            break;
        case "SpicedNectar":
            ConsumeElixir.play();
            progress.maxHealth += 15;
            break;
        case "BitterMedicine":
            ConsumeMedicine.play();
            progress.poisonLevel = 0;
            break;
        case "SweetBerry":
            ConsumeBerry.play();
            progress.health = Math.min(progress.maxHealth, progress.health + progress.maxHealth * .334);
            break;
        case "ClawPowder":
            ConsumePowder.play();
            progress.level += 1;
            break;

    }
}
