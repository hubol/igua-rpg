import {Rectangle, Texture} from "pixi.js";
import {getOpaquePixelsBounds} from "./getOpaquePixelsBounds";

export function trimTextureFrame(texture: Texture) {
    const frame = texture.frame.copyTo(new Rectangle());
    const bounds = getOpaquePixelsBounds(texture);
    if (!bounds)
        return;
    const [x1, y1, x2, y2] = bounds;
    texture.frame = new Rectangle(frame.x + x1, frame.y + y1, x2 - x1 + 1, y2 - y1 + 1);
}
