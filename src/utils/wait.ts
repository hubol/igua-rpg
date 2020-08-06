import {sleep} from "./sleep";
import {CancellationToken} from "./cancellablePromise";

export async function wait(predicate: () => boolean, ct?: CancellationToken)
{
    await waitInterval(predicate, 33, ct);
}

export async function waitInterval(predicate: () => boolean, intervalMs: number, ct?: CancellationToken)
{
    while (!predicate())
        await sleep(intervalMs, ct);
}