import {Texture} from "pixi.js";
import {Hitbox} from "../types/hitbox";

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d')!;

export function getOpaquePixelsHitbox(texture: Texture) {
    // @ts-ignore
    const hitbox: Hitbox = texture.__opaquePixelsHitbox;
    if (hitbox)
        return hitbox;
    // @ts-ignore
    const image: HTMLImageElement | undefined = texture.baseTexture?.resource?.source;
    if (!image || !(image instanceof Image))
        return;

    const w = texture.width;
    const h = texture.height;

    canvas.width = w;
    canvas.height = h;

    const dx = -texture.frame.x;
    const dy = -texture.frame.y;
    context.drawImage(image, dx, dy);

    let x1 = Number.MAX_VALUE;
    let y1 = Number.MAX_VALUE;
    let x2 = Number.MIN_VALUE;
    let y2 = Number.MIN_VALUE;

    const data = context.getImageData(0, 0, w, h).data;
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

    return setOpaquePixelsHitbox(texture, [x1 / w, y1 / h, x2 / w, y2 / h]);
}

function setOpaquePixelsHitbox(texture: Texture, hitbox: Hitbox): Hitbox {
    // @ts-ignore
    return texture.__opaquePixelsHitbox = hitbox;
}
