import { Vector } from "../utils/math/vector";
import {BitmapText, Container, Sprite} from "pixi.js";
import {Sign} from "../textures";
import {AtomixFont} from "../fonts";
import {isPlayerInteractingWith} from "../igua/logic/isPlayerInteractingWith";
import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {cutscene, Cutscene} from "../cutscene/cutscene";
import {merge} from "../utils/merge";
import {scene} from "../igua/scene";
import {show} from "../cutscene/dialog";

export const resolveSign =
    resolveGameObject("Sign", e => scene.gameObjectStage.addChild(sign(e, e.title, e.message)));

export function sign(vector: Vector, title: string, message: string)
{
    const thisCutscene: Cutscene = async () => await show(message);
    const sprite = new Sprite(Sign);
    const text = new BitmapText(title, { fontName: AtomixFont.font, tint: 0xA08030 }).at(1, -2);

    const container = merge(new Container(), { cutscene: thisCutscene });
    container.addChild(sprite, text);
    return container
        .at(vector.x - 14, vector.y - 18)
        .withStep(() => {
            if (isPlayerInteractingWith(container))
                cutscene.play(container.cutscene);
        });
}
