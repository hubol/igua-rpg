import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { UnrealDuckStumpArgs } from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {UnrealCrusher} from "../musics";
import {cracks} from "../gameObjects/cracks";
import {AdjustmentFilter} from "pixi-filters";
import {commonClown} from "../gameObjects/commonClown";
import {sleep} from "../cutscene/sleep";
import {wait} from "../cutscene/wait";

export function UnrealDuckStump() {
    scene.backgroundColor = 0xD99536;
    scene.terrainColor = 0xC85D5D;
    scene.pipeStage.style = 1;
    scene.pipeStage.hueShift = 98;
    scene.pipeStage.filters.push(new AdjustmentFilter({ saturation: 2 }));
    jukebox.play(UnrealCrusher);
    const level = applyOgmoLevel(UnrealDuckStumpArgs);
    level.Portal.withAsync(async () => {
        while (true) {
            await sleep(50);
            level.Portal.y += 1;
        }
    })
    scene.gameObjectStage.withAsync(async () => {
        await wait(() => level.ClownActivator.destroyed);
        level.HiddenBlock.destroy();
        commonClown.instances.forEach(x => x.dangerous = true);
    });
    commonClown.instances.forEach(x => {
        x.bounceAgainstWall = true;
        x.limitedRangeEnabled = false;
        x.dangerous = false;
    });
    level.HiddenBlock.hide();
    cracks(69, 0xC64A31).show(scene.parallax1Stage);
}