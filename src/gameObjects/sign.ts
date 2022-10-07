import { Vector } from "../utils/math/vector";
import {Container, Sprite} from "pixi.js";
import {Sign} from "../textures";
import {isPlayerInteractingWith} from "../igua/logic/isPlayerInteractingWith";
import {cutscene, Cutscene} from "../cutscene/cutscene";
import {merge} from "../utils/object/merge";
import {show} from "../cutscene/dialog";
import {IguaText} from "../igua/text";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {Force} from "../utils/types/force";

export const resolveSign =
    resolveGameObject("Sign", e => sign(e, e.title, e.message));

export function sign(vector: Vector, title: string, message: string)
{
    const thisCutscene: Cutscene = async () => await show(message);
    const sprite = new Sprite(Sign);
    const text = IguaText.Small(title, { tint: 0xA08030 }).at(1, -2);

    const container = merge(new Container(), { message, cutscene: thisCutscene, interactFn: Force<() => void>() });
    container.addChild(sprite, text);
    return container
        .at(vector.x - 14, vector.y - 18)
        .withStep(() => {
            if (isPlayerInteractingWith(container)) {
                if (container.interactFn)
                    container.interactFn();
                else
                    cutscene.play(container.cutscene);
            }
        });
}
