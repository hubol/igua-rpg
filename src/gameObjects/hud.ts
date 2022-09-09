import {Container, Graphics} from "pixi.js";
import {progress} from "../igua/data/progress";
import {player} from "./player";
import {scene} from "../igua/scene";
import {IguaText} from "../igua/text";
import {clownHealthUi} from "./utils/clownUtils";
import {derivedStats} from "../igua/gameplay/derivedStats";
import {healthbar} from "../igua/ui/healthbar";
import {container} from "../utils/pixi/container";
import {dither} from "./dither";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";

enum Color {
    Empty = 0xff0000,
    Hurt = 0xa00000,
    Heal = 0x00ff00,
    Life = 0x0000ff,
    Vulnerable = 0x180098,
}

export function hud()
{
    const healthbarGfx = new Graphics()
        .withStep(() => {
            const max = derivedStats.maxHealth;
            const { life, heal, hurt } = healthbar(progress, progress.health, max);

            healthbarGfx.clear();
            healthbarGfx.beginFill(Color.Empty);
            healthbarGfx.drawRect(0, 0, max, 16);
            healthbarGfx.beginFill(Color.Hurt);
            healthbarGfx.drawRect(0, 0, hurt, 16);
            healthbarGfx.beginFill(Color.Heal);
            healthbarGfx.drawRect(0, 0, heal, 16);
            healthbarGfx.beginFill(progress.health <= 1 ? Color.Vulnerable : Color.Life);
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

    let display = 9;

    const mask = dither();

    const g = new Graphics()
        .withStep(() => {
            const { clownHealth } = clownHealthUi.value;
            display = clownHealth ? 9 : display - 1;
            mask.unit = display / 9;
            if (!clownHealth)
                return;

            g.clear();

            const { life, heal, hurt } = healthbar(clownHealth, clownHealth.unit, 1);

            g.beginFill(Color.Empty);
            g.drawRect(0, 0, width, height);
            g.beginFill(Color.Hurt);
            g.drawRect(0, 0, hurt * width, height);
            g.beginFill(Color.Heal);
            g.drawRect(0, 0, heal * width, height);
            g.beginFill(clownHealth.nearDeath ? Color.Vulnerable : Color.Life);
            const w = life * width;
            if (w > 0)
                g.drawRect(0, 0, Math.ceil(w), height);
        })
        .filter(alphaMaskFilter(mask))
        .at((256 - width) / 2, 240);

    return container(mask, g);
}
