import { BigKey2 } from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {progress} from "../igua/data/progress";
import {makeTempleLevelUtil} from "../igua/gameplay/templeLevelUtil";
import {scene} from "../igua/scene";
import {jukebox} from "../igua/jukebox";
import {ClownDodgerMusic, JungleMusic, JungleUnreal3, RoyalChamberMusic, Temple} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleTempleArgs} from "../levelArgs";
import {portalFluidConfig} from "../gameObjects/portalFluid";
import {approachLinear} from "../utils/math/number";
import {DragRockLow} from "../sounds";

export function JungleTemple() {
    scene.backgroundColor = 0x755E9B;
    scene.terrainColor = 0x383456;

    portalFluidConfig.gotoLevelName = 'JungleTemple';

    jukebox.play(Temple).warm(ClownDodgerMusic, RoyalChamberMusic, JungleMusic, JungleUnreal3);
    const level = applyOgmoLevel(JungleTempleArgs);

    const { key, bigKey, templeLever } = progress.flags.jungle;

    const util = makeTempleLevelUtil(
        [key.fromSickIguana, bigKey.piece1, [level.Key1, level.Door1]],
        [key.fromSickIguana, bigKey.piece2, [level.Key2, level.Door2]],
        [key.fromSickIguana, bigKey.piece3, [level.Key3, level.Door3]]);

    const defaultX = level.MovingWall.x;
    level.MovingWall.withStep(() => level.MovingWall.x = defaultX - Math.round(templeLever.position * 80));

    level.Sign.cutscene = util.signCutscene;
    util.makeBigKeyMeter(jungleBigKeyTextures).at(level.BigKey).ahead();

    advanceTempleMovingWall();
}

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