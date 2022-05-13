import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {GiantsTownArgs} from "../levelArgs";

export function GiantsTown() {
    scene.backgroundColor = 0x98C0E0;
    scene.terrainColor = 0xF8E8E8;
    const level = applyOgmoLevel(GiantsTownArgs);
}