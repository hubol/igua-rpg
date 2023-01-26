import {defaults} from "../../utils/object/defaults";

const badgeTemplate = {
    movementSpeedScale: 1,

    baseAttackPowerScale: 1,
    baseClawAttackPowerScale: 1,
    maxComboClawAttackPowerScale: 1,

    duckEffectivenessPercentage: 0.2,
    duckInvulnerableFrameCount: 90,
    duckTemporaryClawAttackPowerScale: 1,
    duckedDamageCountsTowardsHitCount: true,

    maxHeartPointsScale: 1,

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
    Shield: mk({ duckedDamageCountsTowardsHitCount: false, duckEffectivenessPercentage: 0.8, duckTemporaryClawAttackPowerScale: 2, duckInvulnerableFrameCount: 100, maxHeartPointsScale: 0.2 }),
    Redirect: mk({ poisonAffectsClawAttackPower: true, poisonAffectsMovementSpeed: false }),
    Dexterous: mk({ baseClawAttackPowerScale: 0.9, maxComboClawAttackPowerScale: 1.8 }),
    Cigarette: mk({ lungCastDistanceScale: 36 / 90, lungCastTimeScale: 0.925, lungAttackPowerScale: 1.33 }),

    // TODO These are pretty boring...
    Heavy: mk({ movementSpeedScale: 0.625, baseAttackPowerScale: 1.5 }),
    Oxygen: mk({ baseClawAttackPowerScale: 0.5, lungAttackPowerScale: 1.825 }),
    Cigar: mk({ lungCastTimeScale: 1.33, lungAttackPowerScale: 1.67 }),
}

export type BadgeId = keyof typeof Badges;