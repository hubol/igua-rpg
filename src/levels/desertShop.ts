import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertShopArgs} from "../levelArgs";
import {shop} from "../igua/inventory/shop";
import {scene} from "../igua/scene";
import {Lazy} from "../igua/puppet/mods/lazy";
import {overheadLamp} from "../gameObjects/overheadLamp";
import {BLEND_MODES, Graphics, Sprite} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";
import {resolvePipeHorizontal} from "../gameObjects/walls";
import {vector} from "../utils/math/vector";
import {cigarette} from "../gameObjects/cigarette";
import {show} from "../cutscene/dialog";
import {progress} from "../igua/data/progress";
import {jukebox} from "../igua/jukebox";
import {Country, Shop} from "../musics";
import {cutOutWindow} from "../igua/cutOutWindow";

export function DesertShop() {
    scene.terrainColor = 0x60669B;
    scene.backgroundColor = 0x3B3F63;
    const level = applyOgmoLevel(DesertShopArgs);
    jukebox.play(Shop).warm(Country);

    cutOutWindow(0xF0F0B0, level.Window1, level.Window2, level.Window3, level.Window4);
    const tintedWindow = new Graphics().beginFill(0x60669B).drawRect(0, 0, 1000, 1000);
    tintedWindow.blendMode = BLEND_MODES.MULTIPLY;
    scene.parallax1Stage.addChild(tintedWindow);

    level.Shopkeeper.cutscene = async () => {
        const purchases = await shop('ClawPowder', 'SpicedNectar', 'SweetBerry', 'WonderBallon', 'CommonPoison', 'BitterMedicine');
        if (purchases.length > 0)
            await show("Thanks for your business!");
        else
            await show("Come back later!");
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

    const c = cigarette().at([-16, -12].add(level.BarAttendee)).show();
    c.scale.x = -1;

    if (!progress.flags.desert.diguaIsInBar) {
        level.DiguaGlass.destroy();
        return level.Digua.destroy();
    }

    let diguaTalked = false;
    level.Digua.cutscene = async () => {
        if (!diguaTalked)
            await show("Oh, it's you!");
        diguaTalked = true;
        if (!progress.flags.desert.key.fromDiggingInTown) {
            await show("Did you make sure to pick up the thing I dug up for you? It could be useful.");
        }
        else if (!progress.flags.desert.digua.discussedKey) {
            await show("I hope the thing I dug up for you was useful!");
            await show("I wish I could help you more with your task. But all I can do is dig.");
            progress.flags.desert.digua.discussedKey = true;
        }
        else {
            await show("I wish I could help you more with your task. But all I can do is dig.");
        }
    }
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
