import {scene} from "../igua/scene";
import {JungleTownArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {JungleMusic} from "../musics";
import {mirror} from "../gameObjects/mirror";
import {now} from "../utils/now";

export function JungleTown() {
    jukebox.play(JungleMusic);
    scene.backgroundColor = 0x97D8D8;
    scene.terrainColor = 0x79962E;
    const level = applyOgmoLevel(JungleTownArgs);
    mirror(38, 30, 0xB7B7E2, 0xD2D2EC).at([-9, -2].add(level.SignNeonInn)).behind();
    level.WiggleVine.withStep(() => level.WiggleVine.angle = Math.round(Math.sin(now.s * Math.PI)) * 4);
}