import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { DesertTempleArgs } from "../levelArgs";
import {scene} from "../igua/scene";

export function DesertTemple()
{
    const level = applyOgmoLevel(DesertTempleArgs);
    scene.backgroundColor = 0xCEA5A5;
    scene.terrainColor = 0x283741;
    [level.CracksA, level.CracksA_1].forEach(x => x.tint = 0xA66B6B);
    level.GlowingCircle.tint = 0xF0F0B0;
}