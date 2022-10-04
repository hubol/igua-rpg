import {scene} from "../igua/scene";
import {CapitalEntryArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {heatWaves} from "../gameObjects/heatWaves";
import {cracks} from "../gameObjects/cracks";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {decalsOf} from "../gameObjects/decal";
import {CapitalVolcanoBackdrop, GroundSpeckles} from "../textures";
import {terrainGradient} from "../gameObjects/outerGradient";
import {region} from "../gameObjects/region";

export function CapitalEntry() {
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.stop();
    const level = applyOgmoLevel(CapitalEntryArgs);
    enrichVolcanoTransition(level);
}

function enrichVolcanoTransition(level: GameObjectsType<typeof CapitalEntryArgs>) {
    const drop = level.CapitalVolcanoBackdrop;
    decalsOf(CapitalVolcanoBackdrop).forEach(x => x.tinted(0x78917D));

    cracks(3789.8267, 0x481018, drop.width, drop.height)
        .at(drop)
        .behind(1)
        .add(26, 12);

    const waves = heatWaves(drop.width + 30, 80)
        .at([-110, 110].add(drop))
        .behind();
    waves.angle = -8;

    const transitions = region.instances;
    const colors = [0xE89830, 0xD87838, 0xB85038, 0x912235];
    terrainGradient(transitions, colors);

    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x6D1913));
}