import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {VolcanoBossArenaArgs} from "../levelArgs";
import {cracks} from "../gameObjects/cracks";
import {jukebox} from "../igua/jukebox";
import {VolcanoSomething} from "../musics";
import {heatWaves} from "../gameObjects/heatWaves";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles} from "../textures";
import {container} from "../utils/pixi/container";

export function VolcanoBossArena() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;
    const level = applyOgmoLevel(VolcanoBossArenaArgs);
    jukebox.stop().warm(VolcanoSomething);

    const farBackStage = scene.parallax1Stage.parent.addChildAt(container(), scene.parallax1Stage.index).withStep(() => {
        farBackStage.at(0, 0).add(scene.camera, -0.8);
    });
    cracks(3299.1269, 0x481018).show(farBackStage);
    heatWaves(scene.width + 256, 80).at(-128, 256 - 30)
        .show(scene.parallax1Stage)
        .on('removed', () => farBackStage.destroy());
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x6D1913));
}