import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { UnrealDuckStumpArgs } from "../levelArgs";
import {sleep} from "../cutscene/sleep";

export function UnrealDuckStump() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    scene.pipeStage.style = 1;
    scene.pipeStage.hueShift = 270;
    const level = applyOgmoLevel(UnrealDuckStumpArgs);
    level.Portal.withAsync(async () => {
        while (true) {
            await sleep(50);
            level.Portal.y += 1;
        }
    })
}