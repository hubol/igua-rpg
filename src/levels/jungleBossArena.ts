import {scene} from "../igua/scene";
import {JungleBossArenaArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {progress} from "../igua/data/progress";
import {fishingPole} from "../gameObjects/fishingPole";
import {Sprite} from "pixi.js";
import {UnorthodoxClownMock} from "../textures";
import {clownUnorthodox} from "../gameObjects/clownUnorthodox";

export function JungleBossArena() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;

    progress.flags.jungle.usedBlessing = true;

    const level = applyOgmoLevel(JungleBossArenaArgs);

    const h = clownUnorthodox().at(128, 128).show();

    // fishingPole().at(190, 180).show();

    fishingPole().at(128, 240).show();

    // const m = Sprite.from(UnorthodoxClownMock).at(h).show();
    // m.alpha = 0.5;
}