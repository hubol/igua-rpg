import {game} from "../igua/game";
import {DisplayObject, Graphics, Rectangle, Sprite} from "pixi.js";
import {MessageBox} from "../textures";
import {waitForInput} from "./waitForInput";
import {IguaText} from "../igua/text";
import {container} from "../utils/pixi/container";
import {progress} from "../igua/data/progress";
import {SceneLocal} from "../igua/sceneLocal";
import {Undefined} from "../utils/types/undefined";

const r = new Rectangle();

export function messageBox(message: string) {
    const g = new Graphics();
    const c = container(
        Sprite.from(MessageBox),
        g,
        IguaText.Large(message, { maxWidth: 196 }).at(6, 6))
            .at(24, getMessageBoxY())
            .withTicker(game.hudStage.ticker)
            .withStep(() => {
                c.y = getMessageBoxY();
                g.clear();
                if (!DialogSpeaker.value.speaker)
                    return;
                g.lineStyle(3, 0x00ff00, 1, 0).beginFill(0x005870);
                const d: DisplayObject = (DialogSpeaker.value.speaker as any).speakerbox ?? DialogSpeaker.value.speaker;
                const b = d.getBounds(false, r);
                const sx = b.x + b.width / 2;
                const sy = b.y;

                const x = Math.max(24, Math.min(24 + 208, sx));
                let dx = 24;
                if (b.x > 128) {
                    dx *= -1;
                }

                const y = getMessageBoxY() + 50;

                g.pivot.at(c);
                g.moveTo(x, y);

                // Pretty sure this is a PIXI bug. I don't understand it.
                if (dx < 0)
                    g.lineTo(sx, sy).lineTo(x + dx, y);
                else
                    g.lineTo(x + dx, y).lineTo(sx, sy);
                g.closePath();

                const b2 = c.children[0].getBounds(false, r);
                g.lineStyle(0).beginFill(0x005870).drawRect(b2.x + 3, b2.y + 3, b2.width - 6, b2.height - 6);
            });
    return c;
}

export const DialogSpeaker = new SceneLocal(() => ({
    speaker: Undefined<DisplayObject>()
}), `DialogSpeaker`);

function getMessageBoxY() {
    return progress.status.poison > 0 ? 38 : 27;
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