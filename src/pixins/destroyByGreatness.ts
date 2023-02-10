import {Pixin} from "../utils/pixi/pixin";
import {progress} from "../igua/data/progress";

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