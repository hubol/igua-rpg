import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { VolcanoCavernArgs } from "../levelArgs";
import {cracks} from "../gameObjects/cracks";

export function VolcanoCavern() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;
    const level = applyOgmoLevel(VolcanoCavernArgs);
    // cracks(1245.1269, 0).show(scene.parallax1Stage);
}