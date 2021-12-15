import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertShopArgs} from "../levelArgs";
import {shop} from "../igua/inventory/shop";
import {scene} from "../igua/scene";
import {Lazy} from "../igua/puppet/mods/lazy";
import {overheadLamp} from "../gameObjects/overheadLamp";
import {BLEND_MODES, Graphics, Sprite} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/rng";
import {resolvePipeHorizontal} from "../gameObjects/walls";
import {vector} from "../utils/math/vector";

export function DesertShop() {
    const level = applyOgmoLevel(DesertShopArgs);
    scene.terrainColor = 0x60669B;
    scene.backgroundColor = 0x3B3F63;
    level.Shopkeeper.cutscene = async () => {
        await shop('ClawPowder', 'SpicedNectar', 'SweetBerry', 'WonderBallon', 'CommonPoison', 'BitterMedicine');
    }
    level.Shopkeeper.mods.add(Lazy);
    [level.CracksA, level.CracksA_1].forEach(x => x.tint = 0x1F223A);

    const { light: light1 } = overheadLamp(132).at(level.ShopLamp).ahead();
    light1.blendMode = BLEND_MODES.ADD;
    light1.tint = 0xff0000;
    light1.alpha = 0.5;

    const { light: light2 } = overheadLamp(100).at(level.MiddleLamp).ahead();
    light2.blendMode = BLEND_MODES.ADD;
    light2.tint = 0x0000ff;
    light2.alpha = 0.7;
    flicker(light2);

    [light1, light2].forEach(x => enrichLight(x, level));
}

function enrichLight(light: Sprite, level) {
    for (const y of [-4, -8])
        resolvePipeHorizontal({ ...vector(light.parent).add(-16, y), width: 32, visible: false } as any);
    light.mask = new Graphics()
        .beginFill(0xffffff)
        .drawRect(-96, 0, 192, level.Player.y)
        .drawEllipse(light.parent.x, level.Player.y - 56, 192, 64)
        .show();
}

function flicker(sprite: Sprite) {
    sprite.withAsync(async () => {
        while (true) {
            const defaultAlpha = sprite.alpha;
            await sleep(4000 + rng() * 4000);
            const count = 4 + rng.int(7);
            for (let i = 0; i < count; i++) {
                sprite.alpha = Math.random() * 0.5;
                await sleep(33);
            }
            sprite.alpha = defaultAlpha;
        }
    })
}
