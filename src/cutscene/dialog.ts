import {game} from "../igua/game";
import {Container, Sprite, BitmapText} from "pixi.js";
import {MessageBox} from "../textures";
import {AcrobatixFont} from "../fonts";
import {waitForKey} from "./waitForKey";
import {CancellationToken} from "../utils/cancellablePromise";

export async function show(message: string, ct?: CancellationToken)
{
    const dialogContainer = new Container().at(24, 24);
    dialogContainer
        .addChild(Sprite.from(MessageBox), new BitmapText(message, { fontName: AcrobatixFont.font, maxWidth: 148 }).at(6, 6));

    game.hudStage.addChild(dialogContainer);

    await waitForKey("Space", ct);
    dialogContainer.destroy();
}