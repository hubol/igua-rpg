import {progress} from "../data/progress";
import {Badges} from "./badges";
import {player} from "../../gameObjects/player";
import {cutscene} from "../../cutscene/cutscene";

function computeCurrentNgDamage(ng0Damage: number) {
    return Math.round(ng0Damage * (1 + progress.newGamePlus * 0.5) + 20 * progress.newGamePlus);
}

export const derivedStats = {
    computeDamage(ng0Damage: number) {
        if (cutscene.isPlaying)
            return 0;
        const currentNgDamage = computeCurrentNgDamage(ng0Damage);
        const canPreventDeathIfDucked = progress.health > 1;
        const maximumDamage = player.isDucking && canPreventDeathIfDucked ? progress.health - 1 : Number.MAX_SAFE_INTEGER;
        return Math.max(1, Math.min(Math.floor(currentNgDamage * this.damageTakenScale), maximumDamage));
    },
    get damageTakenScale() {
        return player.isDucking ? derivedStats.badge.duckDamageTakenScale : derivedStats.badge.damageTakenScale;
    },
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
        power *= this.badge.comboClawAttackPowerScale[Math.min(this.badge.comboClawAttackPowerScale.length - 1, progress.status.combo)];
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

export const derivedFlags = {
    get defeatedRequiredEnemies() {
        return progress.flags.final.defeatedOrnateAngel && progress.flags.objects.permanentlyDefeatedEnemies.size >= questConstants.requiredEnemiesToPermanentlyDefeat - 1;
    },
    get enemiesPermanentlyDefeatedScoreX1000() {
        return computeEnemiesPermanentlyDefeatedAsInteger(progress.flags.objects.permanentlyDefeatedEnemies.size, progress.flags.final.defeatedOrnateAngel);
    }
}

const defeatScoreCacheKey = { permanentlyDefeatedEnemiesSize: -1, defeatedOrnateAngel: false, };
let cachedDefeatInteger = -1;

function computeEnemiesPermanentlyDefeatedAsInteger(defeatCount: number, defeatFinalBoss: boolean) {
    if (defeatScoreCacheKey.permanentlyDefeatedEnemiesSize === progress.flags.objects.permanentlyDefeatedEnemies.size
        && defeatScoreCacheKey.defeatedOrnateAngel === progress.flags.final.defeatedOrnateAngel)
        return cachedDefeatInteger;

    const scale = 1000;
    let excludingOrnateAngelScore = 0;
    let remainingDefeatCount = defeatCount;
    let increment = scale;
    while (remainingDefeatCount > 0) {
        const nextScore = excludingOrnateAngelScore + increment;
        if (nextScore >= questConstants.requiredEnemiesToPermanentlyDefeat * scale) {
            increment /= 10;
        }
        else {
            excludingOrnateAngelScore = nextScore;
            remainingDefeatCount -= 1;
        }
    }
    return cachedDefeatInteger = Math.min((defeatFinalBoss ? scale : 0) + excludingOrnateAngelScore, questConstants.requiredEnemiesToPermanentlyDefeat * scale);
}