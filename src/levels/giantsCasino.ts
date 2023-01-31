import {scene} from "../igua/scene";
import {GiantsCasinoArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {decalsOf} from "../gameObjects/decal";
import {CapitalArc, CloudLong, GroundSpeckles} from "../textures";
import {slotMachine} from "../gameObjects/slotMachine";

export function GiantsCasino() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0xD0D020;
    scene.pipeStage.style = 3;
    const level = applyOgmoLevel(GiantsCasinoArgs);

    decalsOf(CapitalArc).forEach(x => x.tinted(scene.terrainColor));
    decalsOf(CloudLong).forEach(x => x.tinted(0x3060E0));
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x7FC41F));

    slotMachine().at(103, 138).show();
}