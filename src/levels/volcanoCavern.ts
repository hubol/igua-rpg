import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { VolcanoCavernArgs } from "../levelArgs";

export function VolcanoCavern() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(VolcanoCavernArgs);
}