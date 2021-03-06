import {game} from "../igua/game";
import {Container, Sprite, BitmapText} from "pixi.js";
import {MessageBox} from "../textures";
import {AcrobatixFont} from "../fonts";
import {waitForKey} from "./waitForKey";

export async function show(message: string)
{
    const dialogContainer = new Container().at(24, 27);
    dialogContainer
        .addChild(Sprite.from(MessageBox), new BitmapText(message, { fontName: AcrobatixFont.font, maxWidth: 196 }).at(6, 6));

    game.hudStage.addChild(dialogContainer);

    await waitForKey("Space")
        .finally(() => dialogContainer.destroy());
}
