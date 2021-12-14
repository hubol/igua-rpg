import {Container, Graphics} from "pixi.js";
import {progress} from "../igua/data/progress";
import {player} from "./player";
import {sceneStack} from "../igua/scene";
import {IguaText} from "../igua/text";

export function hud()
{
    const healthbar = new Graphics()
        .withStep(() => {
            healthbar.clear();
            healthbar.beginFill(0xff0000);
            healthbar.drawRect(0, 0, progress.maxHealth, 16);
            healthbar.beginFill(0x0000ff);
            healthbar.drawRect(0, 0, progress.health, 16);
        });

    const valuables = IguaText.Large("", { tint: 0x00ff00 })
        .withStep(() => {
            if (progress.valuables === 1)
                return valuables.text = '1 valuable';
            valuables.text = `${progress.valuables} valuables`;
        })
        .at(2, 15);

    const container = new Container()
        .withStep(() => container.visible = !player.isDead && sceneStack.isLevel);

    container.addChild(healthbar, valuables);

    return container;
}
