import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { DesertTempleArgs } from "../levelArgs";
import {scene} from "../igua/scene";
import {progress} from "../igua/data/progress";
import {jukebox} from "../igua/jukebox";
import {DesertTown, Fly, Mimic, Temple} from "../musics";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {BigKey1} from "../textures";
import {show} from "../cutscene/dialog";
import {player} from "../gameObjects/player";
import {wait} from "../cutscene/wait";
import {cutscene} from "../cutscene/cutscene";
import {CollectGeneric} from "../sounds";
import {persistence} from "../igua/data/persistence";
import {makeTempleLevelUtil} from "../igua/gameplay/templeLevelUtil";

export function DesertTemple()
{
    scene.backgroundColor = 0xCEA5A5;
    scene.terrainColor = 0x283741;

    jukebox.play(Temple).warm(Fly, Mimic, DesertTown);
    const level = applyOgmoLevel(DesertTempleArgs);
    [level.CracksA, level.CracksA_1].forEach(x => x.tint = 0xA66B6B);
    level.GlowingCircle.tint = 0xF0F0B0;

    const { key, bigKey } = progress.flags.desert;

    const util = makeTempleLevelUtil(
        [key.fromTopOfCrateStack, bigKey.piece1, [level.Key1, level.Door1]],
        [key.fromInn, bigKey.piece2, [level.Key2, level.Door2]],
        [key.fromDiggingInTown, bigKey.piece3, [level.Key3, level.Door3]]);

    level.Sign.cutscene = util.signCutscene;
    util.makeBigKeyMeter(desertBigKeyTextures).at(level.BigKey).behind();

    if (util.allCompleted && !bigKey.reward)
        scene.gameObjectStage.withAsync(async () => {
            await wait(() => player.x >= level.BigKey.x - 25 && !cutscene.isPlaying);
            cutscene.play(async () => {
                bigKey.reward = true;
                await util.allCompletedCutscene(level.BigKey);
                CollectGeneric.play();
                await show("Received Blessing of Earth.");
                await persistence.save();
                jukebox.currentSong?.play();
            });
        });
}

export const desertBigKeyTextures = subimageTextures(BigKey1, 3);
