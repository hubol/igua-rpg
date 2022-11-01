import {scene} from "../igua/scene";
import {CapitalStorehouseArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {CapitalMusicPlease, Hemaboss1, UnusualOminousMusic} from "../musics";
import {dassmannBoss} from "../gameObjects/dassmannBoss";

export function CapitalStorehouse() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(CapitalStorehouseArgs);

    // jukebox.play(UnusualOminousMusic).warm(CapitalMusicPlease, Hemaboss1);
    jukebox.play(Hemaboss1).warm(CapitalMusicPlease, UnusualOminousMusic);

    dassmannBoss().at(level.Dassmann).show();
}