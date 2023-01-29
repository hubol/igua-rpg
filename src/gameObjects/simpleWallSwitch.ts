import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {CapitalSecuritySwitch} from "../textures";
import {Sprite} from "pixi.js";

const switchTxs = subimageTextures(CapitalSecuritySwitch, 2);

export function simpleWallSwitch(onPredicate: () => boolean) {
    const s = Sprite.from(switchTxs[0])
        .withStep(() => s.texture = switchTxs[onPredicate() ? 1 : 0]);

    return s;
}