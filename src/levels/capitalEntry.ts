import {scene} from "../igua/scene";
import {CapitalEntryArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";

export function CapitalEntry() {
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.stop();
    const level = applyOgmoLevel(CapitalEntryArgs);
}