import {IguaPromiseConfig} from "../cutscene/iguaPromiseConfig";
import {game} from "../igua/game";

type Predicate = () => boolean;

export function tickerWait(predicate: Predicate, config?: IguaPromiseConfig)
{
    let fn: () => void;

    const ticker = config?.ticker ?? game.ticker;

    return new Promise((resolve, reject) => {
        fn = () => {
            if (config?.cancellationToken.isCancelled)
            {
                config.cancellationToken.rejectIfCancelled(reject);
                return;
            }

            if (predicate())
                resolve();
        };

        ticker.add(fn);
    })
    .finally(() => ticker.remove(fn));
}