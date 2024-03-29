import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {GiantsTownArgs} from "../levelArgs";
import {Graphics, Sprite} from "pixi.js";
import {GlowingEdge} from "../textures";
import {jukebox} from "../igua/jukebox";
import {
    AboveVolcano,
    CapitalMusicPlease,
    Country,
    DesertTown,
    GiantsCasinoMusic,
    GiantsHouseMusic,
    GiantsNimbusMusic,
    JungleMusic
} from "../musics";
import {show, showAll} from "../cutscene/dialog";
import {region} from "../gameObjects/region";
import {terrainGradient} from "../gameObjects/outerGradient";
import {gate} from "../gameObjects/gate";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {progress} from "../igua/data/progress";
import {sleep} from "../cutscene/sleep";

export function GiantsTown() {
    scene.backgroundColor = 0x98C0E0;
    scene.terrainColor = 0xF8E8E8;
    jukebox.play(GiantsNimbusMusic).warm(GiantsHouseMusic, GiantsCasinoMusic, DesertTown, JungleMusic, Country, AboveVolcano, CapitalMusicPlease);
    const level = applyOgmoLevel(GiantsTownArgs);
    edge(level.DesertGate).tinted(0xF0F0B0);
    edge(level.JungleGate).tinted(0x97D8D8);
    edge(level.VolcanoGate).tinted(0x912235);
    edge(level.CapitalGate).tinted(0xF0B020);
    level.GreeterBigua.withCutscene(async () => {
        await show("Oh, you must be from down below.");
        await show("Welcome to the nimbus of the giants.");
        await show("Before the protectors abandoned our world, we were brought to the skies to create our fortress.");
        if (progress.flags.final.playerMetEmoWizard) {
            await sleep(500);
            await showAll("Oh? One of the protectors lives?",
                `This is fantastic news.`);
            if (!progress.flags.global.somethingGreatHappened)
                await show(`The angels don't stand a chance.`);
        }
        else
            await show("From here, we can carefully watch the angel infestation.");
    });

    level.FarBigua.withCutscene(async () => {
        await show("We sent our associate to the jungle from here.");
        await show("He might appreciate some of our cuisine, if you feel like making a delivery.");
        if (!progress.flags.global.somethingGreatHappened)
            await show("If you wait at the jungle sign, a path to our associate will be revealed.");
    });

    const transitions = region.instances;
    const colors = [0xEDDBE7, 0xDEC9E6, 0xD0B6E5, 0xC2A6E5];
    terrainGradient(transitions, colors);
}

type Gate = ReturnType<typeof gate>;

function edge(r: Gate) {
    const s = Sprite.from(GlowingEdge).at(r).behind();
    s.angle = 90;
    s.anchor.set(0, 1);
    s.width = r.height;
    s.height = r.width;

    const b = getWorldBounds(s);
    r.collisionBox = new Graphics().beginFill().drawRect(b.x + 8, b.y + 16, b.width - 16, b.height).hide().show();

    return s;
}