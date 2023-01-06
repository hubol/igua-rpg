import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { FinalDeepArgs } from "../levelArgs";

export function FinalDeep() {
    scene.backgroundColor = 0x182840;
    scene.terrainColor = 0x4868a0;
    const level = applyOgmoLevel(FinalDeepArgs);
}