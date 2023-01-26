import {progress} from "../data/progress";
import {Badges} from "./badges";
import {nlerp} from "../../utils/math/number";

export const derivedStats = {
    get badge() {
        return Badges[progress.equipment.badge] ?? Badges.None;
    },
    get movementSpeed() {
        let speed = 2.5;
        if (this.badge.poisonAffectsMovementSpeed) {
            speed += 0.75 * Math.min(1, progress.status.poison);
            speed += 0.5 * Math.max(0, progress.status.poison - 1);
        }
        speed *= this.badge.movementSpeedScale;
        return speed;
    },
    get maxHealth() {
        return Math.round((100 + progress.levels.vigor * 15) * this.badge.maxHeartPointsScale);
    },
    get rawAttackPower() {
        return 10 + (progress.levels.strength - 1) * 5;
    },
    get attackPower() {
        let power = this.rawAttackPower;
        power *= this.badge.baseAttackPowerScale;
        power *= nlerp(this.badge.baseClawAttackPowerScale, this.badge.maxComboClawAttackPowerScale, Math.min(1, progress.status.combo / 4));
        if (progress.status.successfulDuckTimer > 0)
            power *= this.badge.duckTemporaryClawAttackPowerScale;
        if (this.badge.poisonAffectsClawAttackPower) {
            power += 10 * Math.min(10, progress.status.poison);
            power += 2 * Math.max(0, progress.status.poison - 10);
        }
        return Math.round(power);
    },
    get rawSpellPower() {
        return 20 + Math.max(progress.levels.humor - 1, 0) * 15;
    },
    get spellPower() {
        return Math.round(this.rawSpellPower * this.badge.baseAttackPowerScale * this.badge.lungAttackPowerScale);
    },
    get canCastSpell() {
        return progress.levels.humor > 0;
    }
}

export const questConstants = {
    requiredEnemiesToPermanentlyDefeat: 19,
}