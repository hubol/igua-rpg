import { BigKey2 } from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {progress} from "../igua/data/progress";
import {makeTempleLevelUtil} from "../igua/gameplay/templeLevelUtil";
import {scene} from "../igua/scene";
import {jukebox} from "../igua/jukebox";
import {ClownDodgerMusic, JungleMusic, RoyalChamberMusic, Temple} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleTempleArgs} from "../levelArgs";
import {portalFluidConfig} from "../gameObjects/portalFluid";

export function JungleTemple() {
    scene.backgroundColor = 0x755E9B;
    scene.terrainColor = 0x383456;

    portalFluidConfig.gotoLevelName = 'JungleTemple';

    jukebox.play(Temple).warm(ClownDodgerMusic, RoyalChamberMusic, JungleMusic);
    const level = applyOgmoLevel(JungleTempleArgs);

    const { key, bigKey } = progress.flags.jungle;

    const util = makeTempleLevelUtil(
        [key.fromSickIguana, bigKey.piece1, [level.Key1, level.Door1]],
        [key.fromSickIguana, bigKey.piece2, [level.Key2, level.Door2]],
        [key.fromSickIguana, bigKey.piece3, [level.Key3, level.Door3]]);

    level.Sign.cutscene = util.signCutscene;
    util.makeBigKeyMeter(jungleBigKeyTextures).at(level.BigKey).ahead();
}

export const jungleBigKeyTextures = subimageTextures(BigKey2, 3);