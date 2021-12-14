import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertShopArgs} from "../levelArgs";
import {shop} from "../igua/inventory/shop";
import {scene} from "../igua/scene";
import {Lazy} from "../igua/puppet/mods/lazy";

export function DesertShop() {
    const level = applyOgmoLevel(DesertShopArgs);
    scene.terrainColor = 0x60669B;
    scene.backgroundColor = 0x3B3F63;
    level.Shopkeeper.cutscene = async () => {
        await shop('ClawPowder', 'SpicedNectar', 'SweetBerry', 'WonderBallon', 'CommonPoison', 'BitterMedicine');
    }
    level.Shopkeeper.mods.add(Lazy);
    [level.CracksA, level.CracksA_1].forEach(x => x.tint = 0x1F223A);
}
