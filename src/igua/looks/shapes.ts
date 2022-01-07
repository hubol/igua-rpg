import {
    LooksClub,
    LooksCrest,
    LooksEye,
    LooksFoot, LooksHead,
    LooksMouth, LooksNails,
    LooksPupil,
    LooksTail,
    LooksTorso
} from "../../textures";
import {subimageTextures} from "../../utils/pixi/simpleSpritesheet";
import {Texture} from "pixi.js";
import {Vector} from "../../utils/math/vector";
import {trimFrame} from "../../utils/pixi/trimFrame";

function textures(texture: Texture, width: number, pixelAnchor: Vector) {
    const anchor = [pixelAnchor.x / width, pixelAnchor.y / texture.height];
    return subimageTextures(texture, { width })
        .map(x => {
            x.defaultAnchor.set(anchor.x, anchor.y);
            return x;
        })
        .map(trimFrame);
}

export const crestShapes = textures(LooksCrest, 16, [10, 10]);
export const eyeShapes = textures(LooksEye, 8, [7, 5]);
export const pupilShapes = textures(LooksPupil, 8, [6, 4]);
export const mouthShapes = textures(LooksMouth, 12, [7, 7]);
export const torsoShapes = textures(LooksTorso, 24, [12, 17]);
export const faceShapes = textures(LooksHead, 18, [0, 16]);
export const tailShapes = textures(LooksTail, 28, [17, 17]);
export const clubShapes = textures(LooksClub, 12, [4, 4]);
export const footShapes = textures(LooksFoot, 14, [6, 12]);
export const clawsShapes = textures(LooksNails, 10, [6, 6]);
