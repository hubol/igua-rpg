import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { VolcanoCavernArgs } from "../levelArgs";
import {cracks} from "../gameObjects/cracks";
import {jukebox} from "../igua/jukebox";
import {VolcanoCaveMusic} from "../musics";
import {progress} from "../igua/data/progress";
import {cutscene} from "../cutscene/cutscene";
import {show} from "../cutscene/dialog";

export function VolcanoCavern() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;
    const level = applyOgmoLevel(VolcanoCavernArgs);
    jukebox.play(VolcanoCaveMusic);
    // cracks(1245.1269, 0).show(scene.parallax1Stage);

    level.KeyGreen.asCollectible(progress.flags.volcano.key, 'hiddenInCave', () => {
        scene.ticker.doNextUpdate = false;
        cutscene.play(async () => {
            await show('Found hidden temple key.');
            scene.ticker.doNextUpdate = true;
        });
    });
}