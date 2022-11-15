import {Graphics, Matrix, RenderTexture, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {player} from "./player";
import {game} from "../igua/game";
import {Undefined} from "../utils/types/undefined";

export function mirror(width, height, color = 0xC0D6E5, lineColor = 0xD5E6F2) {
    let myPlayer = Undefined<typeof player>();
    const m = new Matrix();
    const c = container().withStep(() => {
        m.tx = -c.x + 4;
        m.ty = -c.y;
        if (!myPlayer || myPlayer !== player) {
            myPlayer = player;
            player.withStep(() => game.renderer.render(player, texture, true, m));
        }
    });
    function rect() {
        return new Graphics().beginFill(color).drawRect(0, 0, width, height);
    }
    const g = rect()
        .lineStyle(4, lineColor).moveTo(16, -3).lineTo(-3, 16)
        .lineStyle(2, lineColor).moveTo(32, -3).lineTo(-3, 32)
        .lineStyle(1, lineColor).moveTo(width + 3, height - 16).lineTo(width + 3 - 16, height);
    g.mask = rect();
    const texture = RenderTexture.create({ width, height });
    const s = Sprite.from(texture);
    s.alpha = 0.5;
    c.addChild(g.mask, g, s);
    return c;
}