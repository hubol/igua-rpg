import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {GiantsTownArgs} from "../levelArgs";
import {Sprite} from "pixi.js";
import {GlowingEdge} from "../textures";
import {Rectangle} from "../utils/math/rectangle";
import {jukebox} from "../igua/jukebox";
import {Country, DesertTown, GiantsNimbusMusic, JungleMusic} from "../musics";

export function GiantsTown() {
    scene.backgroundColor = 0x98C0E0;
    scene.terrainColor = 0xF8E8E8;
    jukebox.play(GiantsNimbusMusic).warm(DesertTown, JungleMusic, Country);
    const level = applyOgmoLevel(GiantsTownArgs);
    edge(level.DesertGate).tinted(0xF0F0B0);
    edge(level.JungleGate).tinted(0x97D8D8);
}

function edge(r: Rectangle) {
    const s = Sprite.from(GlowingEdge).at(r);
    s.angle = 90;
    s.anchor.set(0, 1);
    s.width = r.height;
    s.height = r.width;
    return s.behind();
}