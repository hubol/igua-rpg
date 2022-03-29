import {
    LooksClub,
    LooksCrest,
    LooksEye,
    LooksFoot, LooksHead, LooksHorn,
    LooksMouth, LooksNails,
    LooksPupil,
    LooksTail,
    LooksTorso
} from "../../textures";
import {subimageTextures} from "../../utils/pixi/simpleSpritesheet";
import {Texture} from "pixi.js";
import {Vector} from "../../utils/math/vector";
import {trimFrame} from "../../utils/pixi/trimFrame";

export function shapeTextures(texture: Texture, width: number, pixelAnchor: Vector) {
    const anchor = [pixelAnchor.x / width, pixelAnchor.y / texture.height];
    return subimageTextures(texture, { width })
        .map(x => {
            x.defaultAnchor.set(anchor.x, anchor.y);
            return x;
        })
        .map(trimFrame);
}

export const crestShapes = shapeTextures(LooksCrest, 16, [10, 10]);
export const eyeShapes = shapeTextures(LooksEye, 8, [7, 5]);
export const pupilShapes = shapeTextures(LooksPupil, 8, [6, 4]);
export const mouthShapes = shapeTextures(LooksMouth, 12, [7, 7]);
export const torsoShapes = shapeTextures(LooksTorso, 24, [12, 17]);
export const faceShapes = shapeTextures(LooksHead, 18, [0, 16]);
export const hornShapes = shapeTextures(LooksHorn, 8, [2, 6]);
export const tailShapes = shapeTextures(LooksTail, 28, [17, 17]);
export const clubShapes = shapeTextures(LooksClub, 12, [4, 4]);
export const footShapes = shapeTextures(LooksFoot, 14, [6, 12]);
export const clawsShapes = shapeTextures(LooksNails, 10, [6, 6]);
