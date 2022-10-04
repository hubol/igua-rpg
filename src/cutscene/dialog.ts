import {game} from "../igua/game";
import {Sprite} from "pixi.js";
import {MessageBox} from "../textures";
import {waitForInput} from "./waitForInput";
import {IguaText} from "../igua/text";
import {container} from "../utils/pixi/container";
import {progress} from "../igua/data/progress";

export function messageBox(message: string) {
    return container(
        Sprite.from(MessageBox),
        IguaText.Large(message, { maxWidth: 196 }).at(6, 6))
    .at(24, progress.status.poison > 0 ? 38 : 27);
}

export async function show(message: string)
{
    const box = messageBox(message);

    game.hudStage.addChild(box);

    await waitForInput("Confirm")
        .finally(() => box.destroy());
}

export async function showAll(...messages: string[]) {
    for (const message of messages)
        await show(message);
}