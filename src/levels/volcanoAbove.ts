import {scene} from "../igua/scene";
import {VolcanoAboveArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {AboveVolcano, VolcanoSomething} from "../musics";
import {heatWaves} from "../gameObjects/heatWaves";
import {prankster} from "../gameObjects/prankster";

export function VolcanoAbove() {
    scene.backgroundColor = 0x98C0E0;
    scene.terrainColor = 0x5C0A18;
    const level = applyOgmoLevel(VolcanoAboveArgs);
    jukebox.play(AboveVolcano).warm(VolcanoSomething);
    heatWaves(scene.width + 256, 80, 1, 0x912235).at(-128, 330 - 30).show(scene.parallax1Stage);

    prankster().at([0, -3].add(level.Prankster));
}