import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertTownArgs} from "../levelArgs";

export function DesertTown()
{
    const level = applyOgmoLevel(DesertTownArgs);
    level.RightHouse.tint = 0xE08060;
    level.LeftHouse.tint = 0xA0C0C0;
    level.LeftHouseDoor.locked = true;
    level.RightHouseDoor.locked = true;
}