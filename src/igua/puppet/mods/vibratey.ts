import {IguanaPuppetMod} from "../mods";
import {Container} from "pixi.js";
import {sleep} from "../../../cutscene/sleep";

export const Vibratey: IguanaPuppetMod = puppet =>
    new Container()
        .withAsync(async () => {
            while (true) {
                puppet.x += 1;
                await sleep(puppet.ext.vibrateMs ?? 100);
                puppet.x -= 1;
                await sleep(puppet.ext.vibrateMs ?? 100);
            }
        })