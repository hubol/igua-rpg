import {Texture} from "pixi.js";
import {IconBrain, ValuableIcon} from "../../textures";
import {spendValuables} from "../logic/spendValuables";
import {progress} from "../data/progress";

export type CurrencyType = 'valuables' | 'intelligence';

interface Currency {
    iconTexture: Texture;
    spend(amount: number): boolean;
    canAfford(amount: number): boolean;
}

export const currencies: Record<CurrencyType, Currency> = {
    valuables: {
        iconTexture: ValuableIcon,
        spend(amount) {
            return spendValuables(amount);
        },
        canAfford(amount) {
            return progress.valuables >= amount;
        }
    },
    intelligence: {
        iconTexture: IconBrain,
        spend(amount) {
            if (progress.levels.intelligence < amount)
                return false;
            progress.levels.intelligence -= amount;
            return true;
        },
        canAfford(amount) {
            return progress.levels.intelligence >= amount;
        }
    }
}