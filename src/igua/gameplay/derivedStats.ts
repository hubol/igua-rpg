import {progress} from "../data/progress";

export const derivedStats = {
    get maxHealth() {
        return 100 + progress.levels.vigor * 15;
    },
    get attackPower() {
        return 10 + (progress.levels.strength - 1) * 5;
    }
}