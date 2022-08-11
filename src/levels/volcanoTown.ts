import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {VolcanoTownArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {SomberVolcano, Temple, VolcanoCaveMusic, VolcanoSomething} from "../musics";
import {cracks} from "../gameObjects/cracks";
import {heatWaves} from "../gameObjects/heatWaves";
import {mirror} from "../gameObjects/mirror";

export function VolcanoTown() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;
    const level = applyOgmoLevel(VolcanoTownArgs);
    jukebox.play(VolcanoSomething).warm(VolcanoCaveMusic, SomberVolcano, Temple);

    mirror(level.PubWindow.width, level.PubWindow.height, 0x9F4F5D, 0xC38792).at(level.PubWindow).behind();

    cracks(3245.1269, 0x481018).show(scene.parallax1Stage);
    heatWaves(scene.width + 256, 80).at(-128, 300 - 30).show(scene.parallax1Stage);
}