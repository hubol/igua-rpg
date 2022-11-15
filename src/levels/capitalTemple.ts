import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {BigKey4, CapitalArc, KeyBlue} from "../textures";
import {RegionKeys} from "../igua/gameplay/regionKeys";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {CapitalTempleArgs} from "../levelArgs";
import {portalFluidConfig} from "../gameObjects/portalFluid";
import {progress} from "../igua/data/progress";
import {makeTempleLevelUtil} from "../igua/gameplay/templeLevelUtil";
import {CapitalMusicPlease, UnrealBlindMusic} from "../musics";
import {decalsOf} from "../gameObjects/decal";

export function CapitalTemple() {
    scene.backgroundColor = 0x651913;
    scene.terrainColor = 0;
    const level = applyOgmoLevel(CapitalTempleArgs);
    portalFluidConfig.gotoLevelName = 'CapitalTemple';

    const { bigKey } = progress.flags.capital;

    [level.Key1, level.Key2, level.Key3].forEach(x => x.texture = KeyBlue);

    const util = makeTempleLevelUtil(
        [capitalKeys.key1, bigKey.piece1, [level.Key1, level.Door1]],
        [capitalKeys.key2, bigKey.piece2, [level.Key2, level.Door2]],
        [capitalKeys.key3, bigKey.piece3, [level.Key3, level.Door3]]);

    util.playMusic().warm(CapitalMusicPlease, UnrealBlindMusic);

    util.makeBigKeyMeter(capitalBigKeyTextures).at(level.BigKey).behind();
    level.Sign.cutscene = util.signCutscene;
    level.GlowingCircle.tinted(0xFFE451).alpha = 0.625;

    decalsOf(CapitalArc).forEach(x => x.tinted(scene.terrainColor));
    // util.tryGiveReward(bigKey, 'reward', level.BigKey, 'Blessing of Flame');
}

export const capitalBigKeyTextures = subimageTextures(BigKey4, 3);
export const capitalKeys = new RegionKeys(
    KeyBlue,
    p => p.flags.capital.key.fromClown,
    p => p.flags.capital.key.fromTiming,
    p => p.flags.capital.key.fromStorage,
    p => p.flags.capital.bigKey.reward);