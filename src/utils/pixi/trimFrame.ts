import {Rectangle, Texture} from "pixi.js";
import {getOpaquePixelsBounds} from "./getOpaquePixelsBounds";
import {environment} from "../../igua/environment";

export function trimFrame(texture: Texture) {
    // @ts-ignore
    if (texture.__trimmedFrame)
        throw { message: `Attempting to trim frame of already-trimmed texture`, texture };

    const originalFrame = texture.frame.copyTo(new Rectangle());
    const bounds = getOpaquePixelsBounds(texture);
    if (!bounds)
        return texture;
    const [x1, y1, x2, y2] = bounds;
    const width = x2 - x1 + 1;
    const height = y2 - y1 + 1;
    texture.frame = new Rectangle(originalFrame.x + x1, originalFrame.y + y1, width, height);
    const originalX = Math.round(texture.defaultAnchor.x * originalFrame.width);
    const originalY = Math.round(texture.defaultAnchor.y * originalFrame.height);
    const x = originalX - x1;
    const y = originalY - y1;
    texture.defaultAnchor.set(x / width, y / height);
    if (!environment.isProduction)
        maybeDevModePanicRestart(texture);
    // @ts-ignore
    texture.__trimmedFrame = true;
    return texture;
}

function maybeDevModePanicRestart(texture: Texture) {
    if (texture.defaultAnchor.x < 0 && texture.baseTexture.textureCacheIds[0].includes('foot'))
        location.reload();
}