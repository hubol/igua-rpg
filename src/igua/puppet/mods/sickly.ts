import {IguanaPuppetMod} from "../mods";
import {Container} from "pixi.js";
import {sleep} from "../../../cutscene/sleep";
import {rng} from "../../../utils/math/rng";

export const Sickly: IguanaPuppetMod = puppet => {
    puppet.duckImmediately();

    return new Container()
        .withAsync(async () => {
            while (true) {
                await sleep(1000 + rng.int(2000));
                for (let i = 0; i < 8; i++) {
                    puppet.x += 1;
                    await sleep(100);
                    puppet.x -= 1;
                    await sleep(100);
                }
            }
        })
        .on('removed', () => puppet.isDucking = false);
}