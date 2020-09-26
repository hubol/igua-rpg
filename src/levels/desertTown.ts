import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertTownArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {Country, Oracle} from "../musics";
import {game} from "../igua/game";

export function DesertTown()
{
    jukebox.play(Country).warm(Oracle);
    const level = applyOgmoLevel(DesertTownArgs);
    game.backgroundColor = 0xF0F0B0;
    game.terrainColor = 0xE0D060;

    level.RightHouse.tint = 0xE08060;
    level.LeftHouse.tint = 0xA0C0C0;
    level.RightHouseDoor.locked = true;
}