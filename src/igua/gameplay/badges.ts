import {defaults} from "../../utils/object/defaults";

const badgeTemplate = {
    movementSpeedScale: 1,

    baseAttackPowerScale: 1,
    comboClawAttackPowerScale: [1],

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
    Shield: mk({ damageTakenScale: 1.2, duckDamageTakenScale: 0.5, duckedDamageCountsTowardsHitCount: false, duckTemporaryClawAttackPowerScale: 1.33, duckTemporaryClawAttackPowerFrameCount: 10 * 60, duckInvulnerableFrameCount: 100 }),
    Redirect: mk({ poisonAffectsClawAttackPower: true, poisonAffectsMovementSpeed: false }),
    Dexterous: mk({ comboClawAttackPowerScale: [0.7, 0.9, 1.5, 1.2, 1.8, 1.4, 1.4, 1.4, 1.4, 2.3, 1.4] }),
    Cigarette: mk({ lungCastDistanceScale: 36 / 90, lungCastTimeScale: 0.925, lungAttackPowerScale: 1.33 }),

    // TODO These are pretty boring...
    Heavy: mk({ movementSpeedScale: 0.625, baseAttackPowerScale: 1.5 }),
    Oxygen: mk({ comboClawAttackPowerScale: [0.5], lungAttackPowerScale: 1.825 }),
    Cigar: mk({ lungCastTimeScale: 1.33, lungAttackPowerScale: 1.67 }),
}

export type BadgeId = keyof typeof Badges;