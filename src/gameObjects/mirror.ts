import {Graphics, Matrix, RenderTexture, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {player} from "./player";
import {game} from "../igua/game";

export function mirror(width, height) {
    const m = new Matrix();
    const c = container().withStep(() => {
        m.tx = -c.x + 4;
        m.ty = -c.y;
        game.renderer.render(player, texture, true, m);
    });
    const g = new Graphics().beginFill(0xC0D6E5).drawRect(0, 0, width, height);
    const texture = RenderTexture.create({ width, height });
    const s = Sprite.from(texture);
    s.alpha = 0.5;
    c.addChild(g, s);
    return c;
}