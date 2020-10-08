import { Vector } from "../utils/math/vector";
import {BitmapText, Container, Sprite} from "pixi.js";
import {Sign} from "../textures";
import {AtomixFont} from "../fonts";
import {isPlayerInteractingWith} from "../igua/logic/isPlayerInteractingWith";
import {game} from "../igua/game";
import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {Cutscene} from "../cutscene/cutscene";
import {merge} from "../utils/merge";

export const resolveSign =
    resolveGameObject("Sign", e => game.gameObjectStage.addChild(sign(e, (e as any).title, (e as any).message)));

export function sign(vector: Vector, title: string, message: string)
{
    const cutscene: Cutscene = async p => await p.show(message);
    const sprite = new Sprite(Sign);
    const text = new BitmapText(title, { fontName: AtomixFont.font, tint: 0xA08030 }).at(1, -2);

    const container = merge(new Container(), { cutscene });
    container.addChild(sprite, text);
    return container
        .at(vector.x - 14, vector.y - 18)
        .withStep(() => {
            if (isPlayerInteractingWith(container))
                game.cutscenePlayer.playCutscene(container.cutscene);
        });
}