import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {BigKey4, KeyBlue} from "../textures";
import {RegionKeys} from "../igua/gameplay/regionKeys";

export const capitalBigKeyTextures = subimageTextures(BigKey4, 3);
export const capitalKeys = new RegionKeys(
    KeyBlue,
    p => p.flags.capital.key.fromClown,
    p => p.flags.capital.key.fromTiming,
    p => p.flags.capital.key.fromStorage,
    p => p.flags.capital.bigKey.reward);