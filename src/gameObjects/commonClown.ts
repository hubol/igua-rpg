import {Container, Graphics, Sprite} from "pixi.js";
import {CommonClown} from "../textures";
import {scene} from "../igua/scene";
import {now} from "../utils/now";

export function commonClown() {
    const container = new Container();
    const sprite = Sprite.from(CommonClown);
    const graphics = new Graphics();
    const offsetContainer = new Container();
    sprite.anchor.set(.5, 1);
    sprite.withStep(() => {
        const unit = (Math.sin(now.s * 5) + 1) / 2;
        const radians = Math.PI * unit * 2;
        const scale = 0.5 + unit * 2;
        const invertedScale = Math.max(0.95 - unit, 0);
        graphics.clear();
        graphics.lineStyle(1, 0x888888);
        for (let i = 0; i < 1; i += 0.05)
            graphics.lineTo(Math.sin(i * Math.PI * 2.25 * 2 + radians) * 6 * Math.min(1, i * 2) * invertedScale - Math.pow(i, 2) * scale, i * 10 * scale);
        offsetContainer.y = 120 * (1 - unit) - 120;
        if (offsetContainer.y < -20 && Math.random() > 0.1)
        container.x++;
    })
    offsetContainer.addChild(graphics, sprite);
    container.addChild(offsetContainer);
    return scene.gameObjectStage.addChild(container);
}
