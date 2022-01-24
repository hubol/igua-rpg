import {Texture} from "pixi.js";
import {Hitbox} from "../types/hitbox";
import {textureToRgbaArray} from "./textureToRgbaArray";

export function getOpaquePixelsBounds(texture: Texture) {
    // @ts-ignore
    const bounds: Hitbox = texture.__opaquePixelsBounds;
    if (bounds)
        return bounds;

    const w = texture.width;
    const h = texture.height;

    let x1 = Number.MAX_VALUE;
    let y1 = Number.MAX_VALUE;
    let x2 = Number.MIN_VALUE;
    let y2 = Number.MIN_VALUE;

    const data = textureToRgbaArray(texture);

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            const i = y * w + x;
            const a = data[i * 4 + 3];
            if (a < 1)
                continue;
            x1 = Math.min(x1, x);
            y1 = Math.min(y1, y);
            x2 = Math.max(x2, x);
            y2 = Math.max(y2, y);
        }
    }

    if (x1 === 0 && y1 === 0 && x2 === w - 1 && y2 === h - 1)
        return;

    return setOpaquePixelsBounds(texture, [x1, y1, x2, y2]);
}

function setOpaquePixelsBounds(texture: Texture, hitbox: Hitbox): Hitbox {
    // @ts-ignore
    return texture.__opaquePixelsBounds = hitbox;
}
