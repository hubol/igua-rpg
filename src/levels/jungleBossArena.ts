import {scene} from "../igua/scene";
import {JungleBossArenaArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";

export function JungleBossArena() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(JungleBossArenaArgs);
}