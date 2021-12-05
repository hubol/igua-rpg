import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertShopArgs} from "../levelArgs";
import {shop} from "../igua/inventory/shop";

export function DesertShop() {
    const level = applyOgmoLevel(DesertShopArgs);
    level.Shopkeeper.cutscene = async () => {
        await shop('ClawPowder', 'SpicedNectar', 'SweetBerry', 'WonderBallon', 'CommonPoison', 'BitterMedicine');
    }
}
