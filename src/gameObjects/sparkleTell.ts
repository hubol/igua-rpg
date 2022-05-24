import {UnorthodoxTell} from "../sounds";
import {animatedSprite} from "../igua/animatedSprite";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {UnorthodoxClownSparkle} from "../textures";

const sparkleTxs = subimageTextures(UnorthodoxClownSparkle, 5);

export function sparkleTell() {
    UnorthodoxTell.play();
    return animatedSprite(sparkleTxs, 0.3, true).centerAnchor();
}