import {CancellationToken} from "./cancellablePromise";

export function sleep(ms: number, ct?: CancellationToken)
{
    return new Promise((resolve, reject) => {
        ct?.rejectIfCancelled(reject);
        setTimeout(() => {
                ct?.rejectIfCancelled(reject);
                resolve();
            },
            ms);
    });
}

export function sleepUntilSync(targetTimeMilliseconds: number)
{
    const start = performance.now();
    while (performance.now() < start + targetTimeMilliseconds)
    {
        // nop
    }
}