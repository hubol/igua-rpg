import {jukebox} from "../igua/jukebox";
import {Country, Oracle} from "../musics";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertFieldArgs} from "../levelArgs";

export function DesertField()
{
    jukebox.play(Country).warm(Oracle);
    const level = applyOgmoLevel(DesertFieldArgs);
    scene.backgroundColor = 0xF0F0B0;
    scene.terrainColor = 0xE0D060;
}