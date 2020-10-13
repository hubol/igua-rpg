import {BitmapText, Container} from "pixi.js";
import {AcrobatixFont} from "../../../fonts";
import {IguanaPuppetMod} from "../mods";
import {scene} from "../../scene";

export const Sleepy: IguanaPuppetMod = puppet => {
    puppet.canBlink = false;
    puppet.isClosingEyes = true;

    return new Container()
        .withAsync(async p => {
            while (true) {
                await p.sleep(1500);
                const bitmapText = new BitmapText(
                    Math.random() > 0.5 ? "z" : "Z",
                    {fontName: AcrobatixFont.font, tint: 0x222288})
                    .at(puppet.x + Math.sign(puppet.scale.x) * 20, puppet.y - 16)
                    .withAsync(async p => {
                        for (let i = 0; i < 10; i++) {
                            await p.sleep(300);
                            bitmapText.x += Math.random() * 8 - 4;
                            bitmapText.y += Math.random() * -8;
                        }
                        bitmapText.destroy();
                    });
                scene.gameObjectStage.addChild(bitmapText);
            }
        })
        .on("removed", () => puppet.canBlink = true);
};