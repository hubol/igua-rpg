import {scene} from "../igua/scene";
import {CapitalEntryArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {heatWaves} from "../gameObjects/heatWaves";
import {cracks} from "../gameObjects/cracks";
import {irregularRectangle} from "../gameObjects/irregularRectangle";
import {player} from "../gameObjects/player";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {container} from "../utils/pixi/container";
import {game} from "../igua/game";
import {forceRenderable} from "../igua/forceRenderable";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles} from "../textures";
import {Graphics} from "pixi.js";

export function CapitalEntry() {
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.stop();
    const level = applyOgmoLevel(CapitalEntryArgs);
    enrichVolcanoTransition(level);
}

function enrichVolcanoTransition(level: GameObjectsType<typeof CapitalEntryArgs>) {
    const drop = level.CapitalVolcanoBackdrop;
    drop.tinted(0x78917D);

    cracks(3789.8267, 0x481018, drop.width, drop.height)
        .at(drop)
        .behind(1)
        .add(26, 12);

    const waves = heatWaves(drop.width + 30, 80)
        .at([-110, 110].add(drop))
        .behind();
    waves.angle = -8;

    const { width: tw, height: th } = level.TerrainTransition;
    const colors = [0xE89830, 0xD87838, 0xB85038, 0x912235];
    const t = container().at(level.TerrainTransition);
    for (let i = 0; i < colors.length; i++) {
        const p = i * 4;
        const w = tw - p * 2;
        const h = th - p * 2;
        // const seed = 3790.36 + i * 173.987;
        const g = new Graphics().beginFill(colors[i]).drawRect(0, 0, w, h).at(p, p).show(t);
        // irregularRectangle(w, h, seed).at(p, p).tinted(colors[i]).show(t);
    }

    forceRenderable(scene.terrainStage);

    t.mask = scene.terrainStage;
    t.show(scene.cameraStage, scene.terrainStage.index + 1);

    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x6D1913));
}