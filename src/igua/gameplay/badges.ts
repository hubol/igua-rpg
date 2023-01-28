import {defaults} from "../../utils/object/defaults";

const badgeTemplate = {
    movementSpeedScale: 1,

    baseAttackPowerScale: 1,
    baseClawAttackPowerScale: 1,
    minComboClawAttackPowerScale: 1,
    maxComboClawAttackPowerScale: 1,
    comboMaxCount: 4,

    duckInvulnerableFrameCount: 90,
    duckTemporaryClawAttackPowerScale: 1,
    duckTemporaryClawAttackPowerFrameCount: 0,
    duckedDamageCountsTowardsHitCount: true,

    maxHeartPointsScale: 1,

    damageTakenScale: 1,
    duckDamageTakenScale: 0.8,

    poisonAffectsMovementSpeed: true,
    poisonAffectsClawAttackPower: false,

    lungAttackPowerScale: 1,
    lungCastDistanceScale: 1,
    lungCastTimeScale: 1,
}

export type Badge = typeof badgeTemplate;

function mk(args: Partial<Badge>): Badge {
    return defaults(badgeTemplate, args);
}

export const Badges = {
    None: mk({}),
    Shield: mk({ duckDamageTakenScale: 0.5, duckedDamageCountsTowardsHitCount: false, duckTemporaryClawAttackPowerScale: 1.2, duckTemporaryClawAttackPowerFrameCount: 8 * 60, duckInvulnerableFrameCount: 100 }),
    Redirect: mk({ poisonAffectsClawAttackPower: true, poisonAffectsMovementSpeed: false }),
    Dexterous: mk({ baseClawAttackPowerScale: 0.7, minComboClawAttackPowerScale: 1.4, maxComboClawAttackPowerScale: 1.8 }),
    Cigarette: mk({ lungCastDistanceScale: 36 / 90, lungCastTimeScale: 0.925, lungAttackPowerScale: 1.33 }),

    // TODO These are pretty boring...
    Heavy: mk({ movementSpeedScale: 0.625, baseAttackPowerScale: 1.5 }),
    Oxygen: mk({ baseClawAttackPowerScale: 0.5, lungAttackPowerScale: 1.825 }),
    Cigar: mk({ lungCastTimeScale: 1.33, lungAttackPowerScale: 1.67 }),
}

export type BadgeId = keyof typeof Badges;