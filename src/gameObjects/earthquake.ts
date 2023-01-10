import {SceneLocal} from "../igua/sceneLocal";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {vnew} from "../utils/math/vector";
import {wait} from "../cutscene/wait";
import {scene} from "../igua/scene";
import {sleep} from "../cutscene/sleep";

export const Screenshake = new SceneLocal(() => {
    let _delay = 100;
    const c = merge(container(), { pivot: vnew(), duration: 0, get delay() { return _delay; }, set delay(value) { _delay = Math.max(17, value); } })
        .withAsync(async () => {
            while (true) {
                await wait(() => {
                   if (c.duration > 0)
                       return true;
                   scene.cameraStage.pivot.set(0, 0);
                   return false;
                });
                if (scene.cameraStage.pivot.x === 0 && scene.cameraStage.pivot.y === 0)
                    scene.cameraStage.pivot.at(c.pivot);
                else
                    scene.cameraStage.pivot.at(0, 0);
                c.duration -= c.delay;
                await sleep(c.delay);
            }
        });

    return c.show();
}, 'Earthquake');