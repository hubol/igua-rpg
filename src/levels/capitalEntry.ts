import {scene} from "../igua/scene";
import {CapitalEntryArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {clownSharp} from "../gameObjects/clownSharp";
import {player} from "../gameObjects/player";
import {jukebox} from "../igua/jukebox";

export function CapitalEntry() {
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.stop();
    const level = applyOgmoLevel(CapitalEntryArgs);

    clownSharp().at([-220, -40 + 16].add(player)).show();
    clownSharp().at([-250, -40 + 16].add(player)).show();
    clownSharp().at([-300, -40 + 16].add(player)).show();
}