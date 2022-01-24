import {jukebox} from "../igua/jukebox";
import {Country, DesertTown, Temple} from "../musics";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertCostumerArgs} from "../levelArgs";
import {cutOutWindow} from "../igua/cutOutWindow";
import {decal} from "../gameObjects/decal";
import {CracksA} from "../textures";

export function DesertCostumer()
{
    scene.backgroundColor = 0x8FACC1;
    scene.terrainColor = 0xC15B60;
    jukebox.play(DesertTown).warm(Temple, Country);
    const level = applyOgmoLevel(DesertCostumerArgs);
    decal.instances.filter(x => x.texture === CracksA).forEach(x => x.tint = 0x5D8799);

    cutOutWindow(0xF0F0B0, level.Window1, level.Window2, level.Window3);
}