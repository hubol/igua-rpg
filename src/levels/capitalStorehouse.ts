import {scene} from "../igua/scene";
import {CapitalStorehouseArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {CapitalMusicPlease, Hemaboss1, UnusualOminousMusic} from "../musics";
import {dassmannBoss} from "../gameObjects/dassmannBoss";
import {decalsOf} from "../gameObjects/decal";
import {Column, GroundSpeckles} from "../textures";
import {filters} from "pixi.js";

export function CapitalStorehouse() {
    scene.backgroundColor = 0xD0C8C0;
    scene.terrainColor = 0x888080;
    const level = applyOgmoLevel(CapitalStorehouseArgs);

    // jukebox.play(UnusualOminousMusic).warm(CapitalMusicPlease, Hemaboss1);
    jukebox.play(Hemaboss1).warm(CapitalMusicPlease, UnusualOminousMusic);

    dassmannBoss().at(level.Dassmann).show();

    decalsOf(Column).forEach(x => x.opaqueTint = scene.terrainColor);
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x686060));
    const lighten = new filters.ColorMatrixFilter();
    lighten.brightness(1.3, false);
    lighten.saturate(-0.5, true);
    scene.parallax1Stage.filters = [lighten];
}