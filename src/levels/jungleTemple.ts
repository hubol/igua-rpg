import {BigKey2, KeyYellow} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {progress} from "../igua/data/progress";
import {makeTempleLevelUtil} from "../igua/gameplay/templeLevelUtil";
import {scene} from "../igua/scene";
import {ClownDodgerMusic, JungleMusic, JungleUnreal3, RoyalChamberMusic, Temple} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleTempleArgs} from "../levelArgs";
import {portalFluidConfig} from "../gameObjects/portalFluid";
import {approachLinear} from "../utils/math/number";
import {DragRockLow} from "../sounds";
import {RegionKeys} from "../igua/gameplay/regionKeys";

export function JungleTemple() {
    scene.backgroundColor = 0x755E9B;
    scene.terrainColor = 0x383456;

    portalFluidConfig.gotoLevelName = 'JungleTemple';

    const level = applyOgmoLevel(JungleTempleArgs);

    const { bigKey, templeLever } = progress.flags.jungle;

    const util = makeTempleLevelUtil(
        [jungleKeys.key1, bigKey.piece1, [level.Key1, level.Door1]],
        [jungleKeys.key2, bigKey.piece2, [level.Key2, level.Door2]],
        [jungleKeys.key3, bigKey.piece3, [level.Key3, level.Door3]]);

    util.playMusic().warm(ClownDodgerMusic, RoyalChamberMusic, JungleMusic, JungleUnreal3);

    const defaultX = level.MovingWall.x;
    level.MovingWall.withStep(() => level.MovingWall.x = defaultX - Math.round(templeLever.position * 80));

    level.Sign.cutscene = util.signCutscene;
    util.makeBigKeyMeter(jungleBigKeyTextures).at(level.BigKey).ahead();

    util.tryGiveReward(bigKey, 'reward', level.BigKey, 'Blessing of Jungle');

    advanceTempleMovingWall();
}

export const jungleKeys = new RegionKeys(
    KeyYellow,
    p => p.flags.jungle.key.fromSickIguana,
    p => p.flags.jungle.key.fromBiguaRepair,
    p => p.flags.jungle.key.fromSpider,
    p => p.flags.jungle.bigKey);

export function advanceTempleMovingWall(silent = false, distant = false) {
    const { templeLever } = progress.flags.jungle;

    const playSound = () => {
        const id = DragRockLow.play();
        const volume = distant ? 0.2 : 0.6;
        DragRockLow.volume(volume, id);
        DragRockLow.loop(true, id);
        return {
            stop: () => {
                DragRockLow.fade(volume, 0, 300, id);
                setTimeout(() => DragRockLow.stop(id), 300);
                sound = undefined;
            }
        }
    };

    let sound: ReturnType<typeof playSound> | undefined;
    let isAdvancing = false;

    scene.gameObjectStage.withStep(() => {
            const prevPosition = templeLever.position;
            templeLever.position = approachLinear(templeLever.position, templeLever.on ? 1 : 0, 1 / (60 * 6));
            isAdvancing = prevPosition !== templeLever.position;
            if (silent)
                return;

            if (isAdvancing) {
                if (!sound)
                    sound = playSound();
            }
            else if (sound) {
                sound.stop();
            }
        })
        .on('removed', () => sound && sound.stop());

    return {
        get isAdvancing() {
            return isAdvancing;
        }
    }
}

export const jungleBigKeyTextures = subimageTextures(BigKey2, 3);