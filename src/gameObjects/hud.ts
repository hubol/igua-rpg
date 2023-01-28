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
import {SceneLocal} from "../igua/sceneLocal";
import {approachLinear, nlerp} from "../utils/math/number";
import {PlayerSpellColor} from "./playerSpell";
import {game} from "../igua/game";
import {merge} from "../utils/object/merge";

enum Color {
    Empty = 0xff0000,
    Hurt = 0xa00000,
    Heal = 0x00ff00,
    Life = 0x0000ff,
    Vulnerable = 0x180098,
    ChargeEmpty = PlayerSpellColor.Dark,
    ChargeFill = PlayerSpellColor.Light,
}

const AnimatedStats = new SceneLocal(() => ({ maxHealth: derivedStats.maxHealth }), `HudMaxHealth`);

function getVisualHealthbarWidth(maxHealth: number) {
    return Math.min(256, maxHealth * 0.54);
}

export const DamageTakenHud = new SceneLocal(() => {
    let previousHealth = progress.health;
    let newHealth = progress.health;
    let shownNewHealthFrames = 0;
    return merge(container(), {
            get damage() { return shownNewHealthFrames < 60 ? Math.max(0, Math.round(previousHealth - newHealth)) : 0; },
            refresh() {
                newHealth = progress.health;
                shownNewHealthFrames = 0;
            }
        })
        .withStep(() => {
            if (shownNewHealthFrames >= 60)
                previousHealth = progress.health;
            else
                shownNewHealthFrames += 1;
        })
        .withTicker(game.hudStage.ticker)
        .show();
}, `DamageTakenHud`);

export function hud()
{
    const damageText = IguaText.MediumDigits('');
    // @ts-ignore
    damageText.anchor.set(1, 1);

    const healthbarGfx = new Graphics()
        .withStep(() => {
            const max = AnimatedStats.value.maxHealth;
            AnimatedStats.value.maxHealth = approachLinear(nlerp(AnimatedStats.value.maxHealth, derivedStats.maxHealth, 0.125), derivedStats.maxHealth, 1);
            const { life, heal, hurt } = healthbar(progress, progress.health, max, progress.health);

            const f = getVisualHealthbarWidth(max) / max;

            healthbarGfx.clear();
            healthbarGfx.beginFill(Color.Empty);
            healthbarGfx.drawRect(0, 0, max * f, 16);
            healthbarGfx.beginFill(Color.Hurt);
            healthbarGfx.drawRect(0, 0, hurt * f, 16);
            healthbarGfx.beginFill(Color.Heal);
            healthbarGfx.drawRect(0, 0, heal * f, 16);
            healthbarGfx.beginFill(progress.health <= 1 ? Color.Vulnerable : Color.Life);
            healthbarGfx.drawRect(0, 0, Math.max(life > 1 ? 2 : Math.sign(life), life * f), 16);

            const damageValue = DamageTakenHud.value.damage;
            damageText.visible = damageValue > 0;
            damageText.at(healthbarGfx.width - 1, healthbarGfx.height);
            damageText.text = '' + damageValue;
        });

    const spellChargeGfx = new Graphics()
        .withStep(() => {
            spellChargeGfx.visible = !player || player.destroyed || !player.hasSufficientChargeForSpell;
            if (!spellChargeGfx.visible)
                return;

            const width = 16;

            spellChargeGfx.at(player.getBounds().center.x - width / 2, player.worldTransform.ty + 2);
            spellChargeGfx
                .clear()
                .beginFill(Color.ChargeEmpty)
                .drawRect(0, 0, width, 2)
                .beginFill(Color.ChargeFill)
                .drawRect(0, 0, width * (player.castCharge / player.castChargeMax), 2);
        })

    const valuables = IguaText.Large("", { tint: 0x00ff00 })
        .withStep(() => {
            if (progress.valuables === 1)
                return valuables.text = '1 valuable';
            valuables.text = `${progress.valuables} valuables`;
        })
        .at(2, 15);

    const poisoned = IguaText.Large("", { tint: 0x00ff00 })
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

    container.addChild(spellChargeGfx, healthbarGfx, damageText, valuables, poisoned, clownHealthBar());

    return container;
}

function clownHealthBar() {
    const width = 128;
    const height = 4;

    let display = 9;

    const mask = dither();

    const g = new Graphics()
        .withStep(() => {
            const { clownHealth, damageTaken } = clownHealthUi.value;
            display = clownHealth ? 9 : display - 1;
            mask.unit = display / 9;
            if (!clownHealth)
                return;

            t.text = damageTaken <= 0 ? '' : '' + damageTaken;

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
                g.drawRect(0, 0, Math.max(1, Math.floor(w)), height);
        })
        .at((256 - width) / 2, 240);

    const t = IguaText.MediumDigits('')
        .at(240 - 47, 240);

    // @ts-ignore
    t.anchor.set(1, 1);

    return container(mask, g, t)
        .filter(alphaMaskFilter(mask));
}
