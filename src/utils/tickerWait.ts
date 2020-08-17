import {CancellationToken} from "pissant";
import {game} from "../igua/game";

type Predicate = () => boolean;

export function tickerWait(predicate: Predicate, ct?: CancellationToken)
{
    let fn: () => void;

    return new Promise((resolve, reject) => {
        fn = () => {
            if (ct?.isCancelled)
            {
                ct?.rejectIfCancelled(reject);
                return;
            }

            if (predicate())
                resolve();
        };

        game.ticker.add(fn);
    })
    .finally(() => game.ticker.remove(fn));
}