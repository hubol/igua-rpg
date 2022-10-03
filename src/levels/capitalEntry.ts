import {scene} from "../igua/scene";
import {CapitalEntryArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {heatWaves} from "../gameObjects/heatWaves";
import {cracks} from "../gameObjects/cracks";

export function CapitalEntry() {
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.stop();
    const level = applyOgmoLevel(CapitalEntryArgs);
    const drop = level.CapitalVolcanoBackdrop;
    drop.tinted(0x78917D);

    cracks(3789.8267, 0x481018, drop.width, drop.height)
        .at(drop)
        .behind()
        .add(4, 4);

    const waves = heatWaves(drop.width + 30, 80)
        .at([-110, 96].add(drop))
        .behind();
    waves.angle = -8;
}