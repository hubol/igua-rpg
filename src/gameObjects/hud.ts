import {Container, Graphics} from "pixi.js";
import {progress} from "../igua/data/progress";
import {player} from "./player";
import {scene} from "../igua/scene";
import {IguaText} from "../igua/text";
import {clownHealthUi} from "./utils/clownUtils";

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

    const poisoned = IguaText.Large("You are poisoned", { tint: 0x00ff00 })
        .withStep(() => {
            poisoned.visible = progress.poisonLevel > 0;
            if (!poisoned.visible)
                return;
            if (progress.poisonLevel < 2)
                poisoned.text = "You are poisoned";
            else
                poisoned.text = `You are poisoned x${Math.floor(progress.poisonLevel)}`;
        })
        .at(2, 24);

    const container = new Container()
        .withStep(() => container.visible = scene.isLevel && !player.isDead);

    container.addChild(healthbar, valuables, poisoned, clownHealthBar());

    return container;
}

function clownHealthBar() {
    const width = 128;
    const height = 4;

    const g = new Graphics()
        .withStep(() => {
            g.clear();

            const clownHealth = clownHealthUi.value.clownHealth;
            if (!clownHealth)
                return;

            g.beginFill(0xff0000);
            g.drawRect(0, 0, width, height);
            g.beginFill(0x0000ff);
            g.drawRect(0, 0, clownHealth.unit * width, height);
        })
        .at((256 - width) / 2, 240);

    return g;
}
