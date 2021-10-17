import {IguaZone} from "./runInIguaZone";

type Predicate = () => boolean;

export function wait(predicate: Predicate)
{
    if (predicate())
        return Promise.resolve();

    let fn: () => void;

    const ticker = IguaZone.ticker;

    const cancellationToken = IguaZone.cancellationToken;

    return new Promise<void>((resolve, reject) => {
        fn = () => {
            if (cancellationToken?.isCancelled)
            {
                cancellationToken.rejectIfCancelled(reject);
                return;
            }

            if (predicate())
                resolve();
        };

        ticker.add(fn);
    })
    .finally(() => ticker.remove(fn));
}
