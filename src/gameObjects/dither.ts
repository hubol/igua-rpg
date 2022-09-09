import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Dither} from "../textures";
import {TilingSprite} from "pixi.js";
import {merge} from "../utils/object/merge";

export function dither() {
    let unit = 0;
    const length = ditherTxs.length + 1;
    const t = merge(new TilingSprite(ditherTxs[0]), {
        get unit() { return unit; },
        set unit(value) {
            unit = value;
            const index = Math.max(0, Math.min(Math.floor(unit * length), length - 1));
            if (index > 0)
                t.texture = ditherTxs[index - 1];
            t.alpha = index > 0 ? 1 : 0;
        }
    });

    return t;
}

const ditherTxs = subimageTextures(Dither, { width: 256 });