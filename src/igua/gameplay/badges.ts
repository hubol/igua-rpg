import {defaults} from "../../utils/object/defaults";

const badgeTemplate = {
    movementSpeedScale: 1,

    baseAttackPowerScale: 1,
    baseClawAttackPowerScale: 1,
    maxComboClawAttackPowerScale: 1,

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
    Shield: mk({ damageTakenScale: 0.5, duckDamageTakenScale: 0.2, duckedDamageCountsTowardsHitCount: false, duckTemporaryClawAttackPowerScale: 1.33, duckTemporaryClawAttackPowerFrameCount: 240, duckInvulnerableFrameCount: 100, maxHeartPointsScale: 0.2 }),
    Redirect: mk({ poisonAffectsClawAttackPower: true, poisonAffectsMovementSpeed: false }),
    Dexterous: mk({ baseClawAttackPowerScale: 0.9, maxComboClawAttackPowerScale: 1.8 }),
    Cigarette: mk({ lungCastDistanceScale: 36 / 90, lungCastTimeScale: 0.925, lungAttackPowerScale: 1.33 }),

    // TODO These are pretty boring...
    Heavy: mk({ movementSpeedScale: 0.625, baseAttackPowerScale: 1.5 }),
    Oxygen: mk({ baseClawAttackPowerScale: 0.5, lungAttackPowerScale: 1.825 }),
    Cigar: mk({ lungCastTimeScale: 1.33, lungAttackPowerScale: 1.67 }),
}

export type BadgeId = keyof typeof Badges;