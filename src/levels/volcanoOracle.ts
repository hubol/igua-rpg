import {scene} from "../igua/scene";
import {VolcanoOracleArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {AnotherHouse, VolcanoSomething} from "../musics";

export function VolcanoOracle() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(VolcanoOracleArgs);
    jukebox.play(AnotherHouse).warm(VolcanoSomething);
}