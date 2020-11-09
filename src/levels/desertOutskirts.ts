import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertOutskirtsArgs} from "../levelArgs";
import {scene} from "../igua/scene";

export function DesertOutskirts()
{
    applyOgmoLevel(DesertOutskirtsArgs);
    scene.backgroundColor = 0xF0F0B0;
    scene.terrainColor = 0xE0D060;
}