import {scene} from "../igua/scene";
import {CapitalEntryArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {clownSharp} from "../gameObjects/clownSharp";
import {player} from "../gameObjects/player";

export function CapitalEntry() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(CapitalEntryArgs);

    clownSharp().at([-160, -40].add(player)).show();
}