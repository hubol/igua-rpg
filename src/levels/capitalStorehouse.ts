import {scene} from "../igua/scene";
import {CapitalStorehouseArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {CapitalMusicPlease, UnusualOminousMusic} from "../musics";

export function CapitalStorehouse() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(CapitalStorehouseArgs);

    jukebox.play(UnusualOminousMusic).warm(CapitalMusicPlease);
}