import {scene} from "../igua/scene";
import {cutscene} from "./cutscene";
import {show} from "./dialog";

export function freezeSceneAndShowMessage(message: string) {
    scene.ticker.doNextUpdate = false;
    cutscene.play(async () => {
        await show(message);
        scene.ticker.doNextUpdate = true;
    });
}