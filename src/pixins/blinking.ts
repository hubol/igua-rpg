import {Pixin} from "../utils/pixi/pixin";
import {merge} from "../utils/object/merge";
import {Undefined} from "../utils/types/undefined";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";
import {lerp} from "../cutscene/lerp";
import {approachLinear} from "../utils/math/number";

export const Blinking = Pixin({})
    .applies(src => {
        const privateState = {
            blink: 0,
        };

        const dst = merge(src, {
            blinkOverride: Undefined<number>(),
            blink: 0,
        });

        dst.withStep(() => {
            if (dst.blinkOverride === undefined)
                return dst.blink = privateState.blink;
            dst.blink = approachLinear(dst.blink, dst.blinkOverride, 0.1);
        })
        .withAsync(async () => {
            await sleep(500 + rng.int(500));
            while (true) {
                await lerp(privateState, 'blink').to(1).over(100);
                await sleep(60);
                await lerp(privateState, 'blink').to(0).over(100);
                await sleep(300 + rng.int(3000));
            }
        });

        return dst;
    })