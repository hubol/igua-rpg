import {progress} from "../data/progress";

export const derivedStats = {
    get maxHealth() {
        return 100 + progress.levels.vigor * 15;
    },
    get attackPower() {
        return 10 + (progress.levels.strength - 1) * 5;
    },
    get spellPower() {
        return 20 + Math.max(progress.levels.humor - 1, 0) * 15;
    },
    get canCastSpell() {
        return progress.levels.humor > 0;
    }
}

export const questConstants = {
    requiredEnemiesToPermanentlyDefeat: 19,
}