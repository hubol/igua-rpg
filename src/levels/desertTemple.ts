import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { DesertTempleArgs } from "../levelArgs";
import {scene} from "../igua/scene";
import {progress} from "../igua/data/progress";
import {DesertTown, Fly, Mimic} from "../musics";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {BigKey1, KeyRed} from "../textures";
import {makeTempleLevelUtil} from "../igua/gameplay/templeLevelUtil";
import {RegionKeys} from "../igua/gameplay/regionKeys";

export function DesertTemple()
{
    scene.backgroundColor = 0xCEA5A5;
    scene.terrainColor = 0x283741;

    const level = applyOgmoLevel(DesertTempleArgs);
    [level.CracksA, level.CracksA_1].forEach(x => x.tint = 0xA66B6B);
    level.GlowingCircle.tint = 0xF0F0B0;

    const { bigKey } = progress.flags.desert;

    const util = makeTempleLevelUtil(
        [desertKeys.key1, bigKey.piece1, [level.Key1, level.Door1]],
        [desertKeys.key2, bigKey.piece2, [level.Key2, level.Door2]],
        [desertKeys.key3, bigKey.piece3, [level.Key3, level.Door3]]);

    util.playMusic().warm(Fly, Mimic, DesertTown);

    level.Sign.cutscene = util.signCutscene;
    util.makeBigKeyMeter(desertBigKeyTextures).at(level.BigKey).behind();

    util.tryGiveReward(bigKey, 'reward', level.BigKey, 'Blessing of Earth');
}

export const desertBigKeyTextures = subimageTextures(BigKey1, 3);
export const desertKeys = new RegionKeys(
    KeyRed,
    () => progress.flags.desert.key.fromTopOfCrateStack,
    () => progress.flags.desert.key.fromInn,
    () => progress.flags.desert.key.fromDiggingInTown,
    () => progress.flags.desert.bigKey.reward);
