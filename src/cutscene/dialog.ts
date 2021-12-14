import {game} from "../igua/game";
import {Container, Sprite} from "pixi.js";
import {MessageBox} from "../textures";
import {waitForKey} from "./waitForKey";
import {IguaText} from "../igua/text";

export async function show(message: string)
{
    const dialogContainer = new Container().at(24, 27);
    dialogContainer
        .addChild(Sprite.from(MessageBox), IguaText.Large(message, { maxWidth: 196 }).at(6, 6));

    game.hudStage.addChild(dialogContainer);

    await waitForKey("Space")
        .finally(() => dialogContainer.destroy());
}
