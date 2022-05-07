import {Graphics} from "pixi.js";
import {merge} from "../utils/object/merge";
import {game} from "../igua/game";

export function flash(color: number, alpha = 1)
{
    const graphics = merge(new Graphics(), { alpha });
    graphics.withStep(() => {
        graphics.clear();
        graphics.beginFill(color, graphics.alpha);
        graphics.drawRect(0, 0, 256, 256);
    });

    game.hudStage.addChild(graphics);
    return graphics;
}