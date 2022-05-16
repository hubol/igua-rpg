import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {ShrunkenSalad} from "../textures";
import {Sprite} from "pixi.js";
import {progress} from "../igua/data/progress";
import {cutscene} from "../cutscene/cutscene";
import {show} from "../cutscene/dialog";

export const shrunkenSaladTextures = subimageTextures(ShrunkenSalad, 2);

export function shrunkenSalad() {
    const salad = progress.flags.jungle.bigua.salad;

    return Sprite.from(shrunkenSaladTextures[0])
        .centerAnchor()
        .asCollectible(salad, 'held', () => cutscene.play(() => show('Found shrunken meal.')));
}