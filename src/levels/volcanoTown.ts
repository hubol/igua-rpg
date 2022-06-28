import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {VolcanoTownArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {VolcanoCaveMusic} from "../musics";
import {cracks} from "../gameObjects/cracks";
import {heatWaves} from "../gameObjects/heatWaves";

export function VolcanoTown() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;
    const level = applyOgmoLevel(VolcanoTownArgs);
    jukebox.play(VolcanoCaveMusic);

    cracks(3245.1269, 0x481018).show(scene.parallax1Stage);
    heatWaves(scene.width + 256, 80).at(-128, 300 - 30).show(scene.parallax1Stage);
}