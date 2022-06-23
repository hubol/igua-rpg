import {scene} from "../igua/scene";
import {UnrealT9Args} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {KeyboardT9} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {container} from "../utils/pixi/container";
import {Graphics, Sprite} from "pixi.js";
import {trimFrame} from "../utils/pixi/trimFrame";

export function UnrealT9() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(UnrealT9Args);
    keyboard({}).at(level.PlaceKeys).show(scene.terrainStage);
}

const keys = subimageTextures(KeyboardT9, 8).map(trimFrame);

function keyboard({ gap = 10, width = 15, height = 36 }) {
    const c = container();
    let x = 0;
    for (const t of keys) {
        const back = new Graphics().beginFill(0xffffff).drawRect(0, 0, width, height);
        back.tint = 0x303030;
        const key = Sprite.from(t).at(Math.ceil(width / 2), 2);
        key.angle = 90;
        key.anchor.at(0, 0.5);
        container(back, key).show(c).at(x, 0);
        x += width + gap;
    }
    return c;
}