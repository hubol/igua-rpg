import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertTownArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {Country} from "../musics";

export function DesertTown()
{
    jukebox.play(Country);
    const level = applyOgmoLevel(DesertTownArgs);
    level.RightHouse.tint = 0xE08060;
    level.LeftHouse.tint = 0xA0C0C0;
    level.LeftHouseDoor.locked = true;
    // level.RightHouseDoor.locked = true;
    level.RightHouseDoor.levelName = "Test";
}