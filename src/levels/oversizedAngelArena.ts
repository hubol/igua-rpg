import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {OversizedClownArenaArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {oversizedClown} from "../gameObjects/oversizedClown";

export function OversizedAngelArena() {
    const level = applyOgmoLevel(OversizedClownArenaArgs);
    scene.backgroundColor = 0x2F4B5E;
    scene.terrainColor = 0x0F2061;

    oversizedClown().at(256, 128).show();
}
