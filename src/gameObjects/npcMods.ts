import {BitmapText, Container, DisplayObject} from "pixi.js";
import {Npc} from "./npc";
import {AcrobatixFont} from "../fonts";
import {game} from "../igua/game";
import {distance} from "../utils/vector";

export type NpcMod = (npc: Npc) => DisplayObject;

export const Sleepy: NpcMod = puppet => {
    puppet.canBlink = false;
    puppet.isClosingEyes = true;

    return new Container()
        .withAsync(async p => {
            while (true)
            {
                await p.sleep(1500);
                const bitmapText = new BitmapText(
                    Math.random() > 0.5 ? "z" : "Z",
                    { fontName: AcrobatixFont.font, tint: 0x222288 })
                    .at(puppet.x + Math.sign(puppet.scale.x) * 20, puppet.y - 16)
                    .withAsync(async p => {
                        for (let i = 0; i < 10; i++)
                        {
                            await p.sleep(300);
                            bitmapText.x += Math.random() * 8 - 4;
                            bitmapText.y += Math.random() * -8;
                        }
                        bitmapText.destroy();
                    });
                game.gameObjectStage.addChild(bitmapText);
            }
        })
        .on("removed", () => puppet.canBlink = true);
};

export const Lazy: NpcMod = puppet => {
    return new Container().withStep(() => {
        puppet.isDucking = !(Math.sign(game.player.scale.x) !== Math.sign(puppet.scale.x)
            && ((puppet.scale.x > 0 && game.player.x >= puppet.x + 16) || (puppet.scale.x < 0 && game.player.x <= puppet.x - 16))
            && distance(game.player, puppet) < 128);
    });
}