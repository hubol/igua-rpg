import {Container} from "pixi.js";
import {IguanaPuppetMod} from "../mods";
import {sleep} from "../../../cutscene/sleep";
import {rng} from "../../../utils/math/rng";
import {IguaText} from "../../text";

export const Sleepy: IguanaPuppetMod = puppet => {
    puppet.canBlink = false;
    puppet.isClosingEyes = true;

    return new Container()
        .withAsync(async () => {
            while (true) {
                await sleep(1500);
                const bitmapText = IguaText.Large(
                    rng.bool ? "z" : "Z",
                    {tint: 0x222288})
                    .at(puppet.x + Math.sign(puppet.scale.x) * 20, puppet.y - 16)
                    .withAsync(async () => {
                        for (let i = 0; i < 10; i++) {
                            await sleep(300);
                            bitmapText.x += rng() * 8 - 4;
                            bitmapText.y += rng() * -8;
                        }
                        bitmapText.destroy();
                    }).show();
            }
        })
        .on("removed", () => puppet.canBlink = true);
};
