import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {GiantsTownArgs} from "../levelArgs";
import {Sprite} from "pixi.js";
import {GlowingEdge} from "../textures";
import {Rectangle} from "../utils/math/rectangle";
import {jukebox} from "../igua/jukebox";
import {Country, DesertTown, GiantsHouseMusic, GiantsNimbusMusic, JungleMusic} from "../musics";
import {show} from "../cutscene/dialog";

export function GiantsTown() {
    scene.backgroundColor = 0x98C0E0;
    scene.terrainColor = 0xF8E8E8;
    jukebox.play(GiantsNimbusMusic).warm(GiantsHouseMusic, DesertTown, JungleMusic, Country);
    const level = applyOgmoLevel(GiantsTownArgs);
    edge(level.DesertGate).tinted(0xF0F0B0);
    edge(level.JungleGate).tinted(0x97D8D8);
    level.GreeterBigua.withCutscene(async () => {
        await show("Oh, you must be from down below.");
        await show("Welcome to the nimbus of the giants.");
        await show("When the protectors abandoned our world, we came to the skies to create our fortress.");
        await show("From here, we can carefully watch the angel infestation.");
    });

    level.FarBigua.withCutscene(async () => {
        await show("We sent our associate to the jungle from here.");
        await show("He might appreciate some of our cuisine, if you feel like making a delivery.");
        await show("If you wait at the jungle sign, a path to our associate will be revealed.");
    })
}

function edge(r: Rectangle) {
    const s = Sprite.from(GlowingEdge).at(r);
    s.angle = 90;
    s.anchor.set(0, 1);
    s.width = r.height;
    s.height = r.width;
    return s.behind();
}