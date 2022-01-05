import {Rectangle, Texture} from "pixi.js";
import {getOpaquePixelsBounds} from "./getOpaquePixelsBounds";

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
    const originalY = Math.round(texture.defaultAnchor.x * originalFrame.height);
    texture.defaultAnchor.set(originalX / width, originalY / height);
    // @ts-ignore
    texture.__trimmedFrame = true;
    return texture;
}
