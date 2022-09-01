import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {BigKey3, KeyGreen} from "../textures";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {VolcanoTempleArgs} from "../levelArgs";
import {UnrealCrusher, UnrealDrawingMusic, UnrealT9Music, VolcanoSomething} from "../musics";
import {cracks} from "../gameObjects/cracks";
import {heatWaves} from "../gameObjects/heatWaves";
import {progress} from "../igua/data/progress";
import {makeTempleLevelUtil} from "../igua/gameplay/templeLevelUtil";
import {portalFluidConfig} from "../gameObjects/portalFluid";

export function VolcanoTemple() {
    scene.backgroundColor = 0x651913;
    scene.terrainColor = 0;
    const level = applyOgmoLevel(VolcanoTempleArgs);
    portalFluidConfig.gotoLevelName = 'VolcanoTemple';

    const { key, bigKey } = progress.flags.volcano;

    [level.Key1, level.Key2, level.Key3].forEach(x => x.texture = KeyGreen);

    const util = makeTempleLevelUtil(
        [key.hiddenInCave, bigKey.piece1, [level.Key1, level.Door1]],
        [key.fromPrankster, bigKey.piece2, [level.Key2, level.Door2]],
        [key.fromLava, bigKey.piece3, [level.Key3, level.Door3]]);

    util.playMusic().warm(VolcanoSomething, UnrealCrusher, UnrealT9Music, UnrealDrawingMusic);

    cracks(1090.378, 0x481018).behind(1);
    const waves = heatWaves(scene.width + 256, 80, 0).at(-128, 260).behind(0);
    waves.cacheAsBitmap = true;

    util.makeBigKeyMeter(volcanoBigKeyTextures).at(level.BigKey).behind();
    level.Sign.cutscene = util.signCutscene;
    level.GlowingCircle.tinted(0xFFE451).alpha = 0.625;

    util.tryGiveReward(bigKey, 'reward', level.BigKey, 'Blessing of Fire');
}

export const volcanoBigKeyTextures = subimageTextures(BigKey3, 3);