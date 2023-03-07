import {scene} from "../igua/scene";
import {VolcanoAboveArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {AboveVolcano, VolcanoSomething} from "../musics";
import {heatWaves} from "../gameObjects/heatWaves";
import {prankster} from "../gameObjects/prankster";
import {cutscene} from "../cutscene/cutscene";
import {player} from "../gameObjects/player";
import {distance} from "../utils/math/vector";
import {Container, Sprite} from "pixi.js";
import {wait} from "../cutscene/wait";
import {decalsOf} from "../gameObjects/decal";
import {CloudLong, GroundSpeckles, SkylightTriangle} from "../textures";
import {cameraLock} from "../gameObjects/cameraLock";
import {DestroyAfterGreatness, DestroyBeforeGreatness} from "../pixins/destroyByGreatness";
import {showAll} from "../cutscene/dialog";
import {sleep} from "../cutscene/sleep";

export function VolcanoAbove() {
    scene.backgroundColor = 0x98C0E0;
    scene.terrainColor = 0x5C0A18;
    const level = applyOgmoLevel(VolcanoAboveArgs);
    jukebox.play(AboveVolcano).warm(VolcanoSomething);
    heatWaves(scene.width + 256, 80, 1, 0x912235).at(-128, 330 - 30).show(scene.parallax1Stage);

    cameraLock({ maxX: level.KeepCameraToLeft.x }, () => player.x >= level.KeepCameraToLeft.x - 16);

    if (distance(player, level.Player) < 80) {
        level.ToTownGate.active = false;
        player.vspeed = -3;
        const walk = new Container().withStep(() => player.hspeed = 2.3).show();
        cutscene.play(async () => {
            await wait(() => player.x >= level.PlayerStopEntry.x);
            walk.destroy();
            level.ToTownGate.active = true;
        })
    }

    decalsOf(CloudLong).forEach(x => x.tinted(0xEFE1E2));
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x490512));
    prankster().withPixin(DestroyAfterGreatness).at([0, -3].add(level.Prankster));
    const triangle = Sprite.from(SkylightTriangle).at(level.LibraryBook.x + 2, 0).ahead();
    triangle.anchor.x = 0.5;

    let talkedToSadOracle = false;

    level.SadOracle
        .withPixin(DestroyBeforeGreatness)
        .withCutscene(async () => {
            if (talkedToSadOracle) {
                await showAll(`I hope that I find my calling with some new task.`);
                return;
            }
            await showAll(`I see that you completed your work, after all.`,
                `I'm sorry that we led you astray.`,);
            await sleep(1000);
            await showAll(`I think some of us, deep down, knew that at least some of what we believed in was phony.`,
                `But we had an image to uphold...`,);
            await sleep(1000);
            await showAll(
                `I think that now might be a very convenient time for me to leave the oracle group.`,
                `Maybe I will find my calling with some new task.`);
            talkedToSadOracle = true;
        });
}