import {defaults} from "../../utils/object/defaults";

const badgeTemplate = {
    id: <any>'None',
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

    name: '?',
    description: '?',
}

export type Badge = typeof badgeTemplate;

function mk(args: Partial<Badge>, name = '?', description = '?'): Badge {
    return defaults(badgeTemplate, { ...args, name, description });
}

export const Badges = {
    None: mk({}, 'Nothing'),
    Shield: mk({ duckDamageTakenScale: 0.5, duckedDamageCountsTowardsHitCount: false, duckTemporaryClawAttackPowerScale: 1.33, duckTemporaryClawAttackPowerFrameCount: 10 * 60, duckInvulnerableFrameCount: 100 },
        'Brilliant Shield', 'Ducking is more effective and grants a temporary Claw attack power boost.'),
    Redirect: mk({ poisonAffectsClawAttackPower: true, poisonAffectsMovementSpeed: false },
        'Redirect Tool', 'Poison increases Claw attack power instead of speed.'),
    Dexterous: mk({ comboClawAttackPowerScale: [0.7, 0.9, 1.5, 1.2, 1.8, 1.4, 1.4, 1.4, 1.4, 2.3, 1.4] },
        'Dexterous Twig', 'Claw attack power is reduced, but temporarily increases with consecutive attacks.'),
    Cigarette: mk({ lungAttackPowerScale: 1.67 },
        'Cigarette Charm', 'Lung attack power is increased.'),

    // TODO These are pretty boring...
    Heavy: mk({ movementSpeedScale: 0.625, baseAttackPowerScale: 1.5 }),
    Oxygen: mk({ comboClawAttackPowerScale: [0.5], lungAttackPowerScale: 1.825 }),
    Cigar: mk({ lungCastTimeScale: 2, lungAttackPowerScale: 2.67 }),
}

for (const badgeId in Badges) {
    Badges[badgeId].id = badgeId;
}

export type BadgeId = keyof typeof Badges;