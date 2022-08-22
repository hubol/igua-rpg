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
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {volcanoBigKeyTextures} from "./volcanoTemple";
import {teleportToTheRoomOfDoors} from "../gameObjects/portalFluid";
import {resolveTreeStumpDestructive} from "../gameObjects/treeStumpDestructive";

export function UnrealDuckStump() {
    scene.backgroundColor = 0xD99536;
    scene.terrainColor = 0xC85D5D;
    scene.pipeStage.style = 1;
    scene.pipeStage.hueShift = 98;
    scene.pipeStage.filters.push(new AdjustmentFilter({ saturation: 2 }));
    jukebox.play(UnrealCrusher);
    const level = applyOgmoLevel(UnrealDuckStumpArgs);
    let fast = false;
    level.Portal.withAsync(async () => {
        while (true) {
            await sleep(50);
            level.Portal.y += 1;
            if (fast) {
                await sleep(25);
                level.Portal.y += 1;
            }
        }
    })
        .withAsync(async () => {
            await sleep(6000);
            fast = true;
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

    scene.gameObjectStage.withAsync(async () => {
        await wait(() => progress.status.ballons.length > 0);
        resolveTreeStumpDestructive(level.StumpBallonPosition as any);
        level.FinalStump.destroy();
    });

    level.HiddenBlock.hide();
    cracks(69, 0xC64A31).show(scene.parallax1Stage);
    const key = bigKeyPiece(progress.flags.volcano.bigKey, volcanoBigKeyTextures[0], 'piece1').show().at(level.KeyPiece);
    key.onCollect = teleportToTheRoomOfDoors;
}