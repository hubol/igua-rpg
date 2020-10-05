import {IguaPromiseConfig} from "../cutscene/iguaPromiseConfig";

type Predicate = () => boolean;

export function tickerWait(predicate: Predicate, config?: IguaPromiseConfig)
{
    let fn: () => void;

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

        config?.ticker.add(fn);
    })
    .finally(() => config?.ticker.remove(fn));
}