import {Container, Graphics} from "pixi.js";
import {progress} from "../igua/data/progress";
import {player} from "./player";
import {scene} from "../igua/scene";
import {IguaText} from "../igua/text";
import {clownHealthUi} from "./utils/clownUtils";
import {derivedStats} from "../igua/gameplay/derivedStats";
import {healthbar} from "../igua/ui/healthbar";

export function hud()
{
    const healthbarGfx = new Graphics()
        .withStep(() => {
            const max = derivedStats.maxHealth;
            const { life, heal, hurt } = healthbar(progress, progress.health, max);

            healthbarGfx.clear();
            healthbarGfx.beginFill(0xff0000);
            healthbarGfx.drawRect(0, 0, max, 16);
            healthbarGfx.beginFill(0xffff00);
            healthbarGfx.drawRect(0, 0, hurt, 16);
            healthbarGfx.beginFill(0x00ff00);
            healthbarGfx.drawRect(0, 0, heal, 16);
            healthbarGfx.beginFill(0x0000ff);
            healthbarGfx.drawRect(0, 0, Math.max(Math.sign(life), life), 16);
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
            poisoned.visible = progress.status.poison > 0;
            if (!poisoned.visible)
                return;
            if (progress.status.poison < 2)
                poisoned.text = "You are poisoned";
            else
                poisoned.text = `You are poisoned x${Math.floor(progress.status.poison)}`;
        })
        .at(2, 24);

    const container = new Container()
        .withStep(() => container.visible = scene.isLevel && !player.isDead);

    container.addChild(healthbarGfx, valuables, poisoned, clownHealthBar());

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

            const { life, heal, hurt } = healthbar(clownHealth, clownHealth.unit, 1);

            g.beginFill(0xff0000);
            g.drawRect(0, 0, width, height);
            g.beginFill(0xffff00);
            g.drawRect(0, 0, hurt * width, height);
            g.beginFill(0x00ff00);
            g.drawRect(0, 0, heal * width, height);
            g.beginFill(clownHealth.nearDeath ? 0x180098 : 0x0000ff);
            const w = life * width;
            if (w > 0)
                g.drawRect(0, 0, Math.ceil(w), height);
        })
        .at((256 - width) / 2, 240);

    return g;
}
