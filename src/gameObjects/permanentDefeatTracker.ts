import {SceneLocal} from "../igua/sceneLocal";
import {merge} from "../utils/object/merge";
import {container} from "../utils/pixi/container";
import {game} from "../igua/game";
import {scene} from "../igua/scene";
import {progress} from "../igua/data/progress";
import {Dithered} from "../pixins/dithered";
import {approachLinear} from "../utils/math/number";
import {Graphics} from "pixi.js";
import {PlayerSpellColor} from "./playerSpell";
import {questConstants} from "../igua/gameplay/derivedStats";
import {emoWizardHead} from "./emoWizard";
import {rng} from "../utils/math/rng";
import {UseMenuState} from "../igua/inventory/showUseMenu";
import {IguaText} from "../igua/text";
import {waitHold} from "../cutscene/waitHold";

const light = 0x00ff00;

export const PermanentDefeatTracker = new SceneLocal(() => {
    let value = progress.flags.objects.permanentlyDefeatedEnemies.size;
    let maxDitheredFrames = 0;

    const c = merge(container(), { showFrames: 0 })
        .withTicker(game.hudStage.ticker)
        .withPixin(Dithered({ dither: 0 }))
        .withStep(() => {
            if (!UseMenuState.value.open) {
                c.showFrames -= 1;
                const prevDither = c.dither;
                c.dither = approachLinear(c.dither, c.showFrames > 0 ? 1 : 0, 0.075);
                if (prevDither > 0 && c.dither <= 0)
                    chooseHead();
            }
            else {
                c.showFrames = 0;
                c.dither = 1;
            }

            const n = Math.round(value);
            numerator.text = n.toString().padStart(2, '0');
            numerator.tint = n > 0 ? light : PlayerSpellColor.Dark;
            denominator.tint = n >= questConstants.requiredEnemiesToPermanentlyDefeat ? light : PlayerSpellColor.Dark;
            bar.tint = denominator.tint;

            if (c.dither >= 1) {
                maxDitheredFrames += 1;
                if (maxDitheredFrames >= 6)
                    value = approachLinear(value, progress.flags.objects.permanentlyDefeatedEnemies.size, 0.05);
            }
            else
                maxDitheredFrames = 0;
        })
        .show(game.hudStage);

    const g = new Graphics()
        .withStep(() => {
            g.clear()
                .beginFill(PlayerSpellColor.Dark).drawRect(-0.5, 0, 1, 1)
                .beginFill(light).drawRect(-0.5, 0, 1, Math.min(1, value / questConstants.requiredEnemiesToPermanentlyDefeat));
        })
        .show(c);

    function chooseHead() {
        head.face.emotion = rng.int(6);
    }

    const head = emoWizardHead()
        .withAsync(async () => {
            while (true) {
                const steps = 30 + rng.int(210);
                await waitHold(() => UseMenuState.value.open, steps);
                chooseHead();
            }
        })
        .at(-17, -22)
        .show(c);

    const denominator = IguaText.Large('' + questConstants.requiredEnemiesToPermanentlyDefeat).at(5, 1);
    const bar = IguaText.Large('/');
    const numerator = IguaText.Large('03').at(0, -2);
    // @ts-ignore
    numerator.anchor.set(1, 0);
    container(numerator, bar, denominator).at(-2, 128).show(c);

    g.scale.set(7, -128);
    g.y = -g.scale.y;

    c.at(256 - 16, 64);

    scene.gameObjectStage.on('removed', () => c.destroy());

    return c;

}, `PermanentDefeatTracker`);