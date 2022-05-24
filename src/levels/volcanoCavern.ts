import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { VolcanoCavernArgs } from "../levelArgs";
import {clownWonderful} from "../gameObjects/clownWonderful";
import {player} from "../gameObjects/player";

export function VolcanoCavern() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(VolcanoCavernArgs);

    clownWonderful().at(player).show().add(-36, 10);
    // clownWonderful().at(player).show().add(-36 - 128, 10);
    clownWonderful().at(player).show().add(-36 - 128 - 128, 10);
    clownWonderful().at(player).show().add(-36 - 128 - 128 - 128, 10);
}