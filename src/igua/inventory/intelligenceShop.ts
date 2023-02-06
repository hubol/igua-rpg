import {PotionType} from "./potions";
import {shop} from "./shop";

function getIntelligenceCost(type: PotionType) {
    if (type === 'RemovingDevice')
        return 0;
    return 1;
}

export function intelligenceShop(potions: PotionType[] = [ 'RemovingDevice', 'Shield', 'Dexterous', 'Redirect', 'Cigarette', 'SpicedNectar', 'ClawPowder' ]) {
    return shop({ potions, payment: { currency: 'intelligence', getCost: getIntelligenceCost } });
}

