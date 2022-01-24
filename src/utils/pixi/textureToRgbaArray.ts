import {Extract, RenderTexture, Texture} from "pixi.js";

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d')!;

let extract: Extract;

export function textureToRgbaArray(texture: Texture) {
    if (texture instanceof RenderTexture) {
        if (extract === undefined)
            extract = new Extract(require("../../igua/game").game.renderer);
        return extract.pixels(texture);
    }

    // @ts-ignore
    const image: HTMLImageElement | undefined = texture.baseTexture?.resource?.source;
    if (!image || !(image instanceof Image))
        throw { message: `Could not convert texture to rgba array!`, texture };

    const w = texture.width;
    const h = texture.height;

    canvas.width = w;
    canvas.height = h;

    const dx = -texture.frame.x;
    const dy = -texture.frame.y;
    context.drawImage(image, dx, dy);

    return context.getImageData(0, 0, w, h).data;
}