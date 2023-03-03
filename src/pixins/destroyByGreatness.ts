import {Pixin} from "../utils/pixi/pixin";
import {progress} from "../igua/data/progress";
import {Container} from "pixi.js";
import {AsshatTicker} from "../utils/asshatTicker";
import {container} from "../utils/pixi/container";

export const DestroyAfterGreatness = Pixin()
    .applies(src => {
        return src.withStep(() => {
            if (progress.flags.global.somethingGreatHappened)
                src.destroy();
        });
    })();

export const DestroyBeforeGreatness = Pixin()
    .applies(src => {
        return src.withStep(() => {
            if (!progress.flags.global.somethingGreatHappened)
                src.destroy();
        });
    })();

export const HideBeforeGreatness = Pixin()
    .restricted<Container>()
    .applies(src => {
        const ticker = new AsshatTicker();
        ticker.doNextUpdate = progress.flags.global.somethingGreatHappened;

        container()
            .withStep(() => {
                const previousDoNextUpdate = ticker.doNextUpdate;
                ticker.doNextUpdate = progress.flags.global.somethingGreatHappened;

                if (!ticker.doNextUpdate)
                    src.visible = false;
                else if (!previousDoNextUpdate)
                    src.visible = true;

                ticker.update();
            })
            .show();

        return src
            .withTicker(ticker)
    })();