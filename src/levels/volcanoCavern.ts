import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { VolcanoCavernArgs } from "../levelArgs";
import {cracks} from "../gameObjects/cracks";
import {jukebox} from "../igua/jukebox";
import {VolcanoCaveMusic, VolcanoSomething} from "../musics";
import {progress} from "../igua/data/progress";
import {heatWaves} from "../gameObjects/heatWaves";
import {decalsOf} from "../gameObjects/decal";
import {CrackSmall, GroundSpeckles} from "../textures";
import {freezeSceneAndShowMessage} from "../cutscene/freezeSceneAndShowMessage";

export function VolcanoCavern() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;
    const level = applyOgmoLevel(VolcanoCavernArgs);
    jukebox.play(VolcanoCaveMusic).warm(VolcanoSomething);

    level.KeyGreen.asCollectible(progress.flags.volcano.key, 'hiddenInCave', () => freezeSceneAndShowMessage('Found hidden temple key.'));

    cracks(3245.1269, 0x481018).show(scene.parallax1Stage);
    heatWaves(scene.width + 256, 80).at(-128, 256 - 30).show(scene.parallax1Stage);
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x6D1913));
    decalsOf(CrackSmall).forEach(x => x.tinted(0x6D1913));
}