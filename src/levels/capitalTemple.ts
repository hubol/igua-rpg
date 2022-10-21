import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {BigKey4, KeyBlue} from "../textures";
import {RegionKeys} from "../igua/gameplay/regionKeys";
import {progress} from "../igua/data/progress";

export const capitalBigKeyTextures = subimageTextures(BigKey4, 3);
export const capitalKeys = new RegionKeys(
    KeyBlue,
    () => progress.flags.capital.key.fromClown,
    () => progress.flags.capital.key.fromTiming,
    () => progress.flags.capital.key.fromStorage,
    () => progress.flags.capital.bigKey.reward);