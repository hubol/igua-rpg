import {inventory} from "./inventory";
import {PotionType} from "./potions";
import {progress} from "../data/progress";
import {
    ConsumeBallon,
    ConsumeBerry,
    ConsumeElixir,
    ConsumeEquip,
    ConsumeMedicine,
    ConsumePoison,
    ConsumePowder,
    ConsumeRemover
} from "../../sounds";
import {derivedStats} from "../gameplay/derivedStats";
import {Badges} from "../gameplay/badges";

export function consumePotion(index: number) {
    const potion = inventory.get(index);
    if (!potion)
        return;
    consumePotionImpl(potion);
    inventory.remove(index);
}

function consumePotionImpl(potion: PotionType) {
    if (potion in Badges) {
        progress.equipment.badge = potion as any;
        ConsumeEquip.play();
        return;
    }

    switch (potion) {
        case "WonderBallon":
            progress.status.ballons.push(1);
            ConsumeBallon.play();
            break;
        case "CommonPoison":
            ConsumePoison.play();
            progress.status.poison += 1;
            break;
        case "SpicedNectar":
            ConsumeElixir.play();
            progress.levels.vigor += 1;
            break;
        case "BitterMedicine":
            ConsumeMedicine.play();
            progress.status.poison = 0;
            break;
        case "SweetBerry":
            ConsumeBerry.play();
            progress.health = Math.min(derivedStats.maxHealth, progress.health + derivedStats.maxHealth * .334);
            break;
        case "ClawPowder":
            ConsumePowder.play();
            progress.levels.strength += 1;
            break;
        case "RemovingDevice":
            progress.equipment.badge = 'None';
            ConsumeRemover.play();
            break;
    }
}
