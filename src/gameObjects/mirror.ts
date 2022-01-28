import {Graphics, Matrix, RenderTexture, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {player} from "./player";
import {game} from "../igua/game";

export function mirror(width, height) {
    const m = new Matrix();
    const c = container().withStep(() => {
        m.tx = -c.x + 4;
        m.ty = -c.y;
        // @ts-ignore
        if (!player.__mirror) {
            player.withStep(() => game.renderer.render(player, texture, true, m));
            // @ts-ignore
            player.__mirror = true;
        }
    });
    function rect() {
        return new Graphics().beginFill(0xC0D6E5).drawRect(0, 0, width, height);
    }
    const g = rect()
        .lineStyle(4, 0xD5E6F2).moveTo(16, -3).lineTo(-3, 16)
        .lineStyle(2, 0xD5E6F2).moveTo(32, -3).lineTo(-3, 32)
        .lineStyle(1, 0xD5E6F2).moveTo(width + 3, height - 16).lineTo(width + 3 - 16, height);
    g.mask = rect();
    const texture = RenderTexture.create({ width, height });
    const s = Sprite.from(texture);
    s.alpha = 0.5;
    c.addChild(g.mask, g, s);
    return c;
}