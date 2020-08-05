import {
    CancellationToken,
    makeCancellablePromiseFactory,
    PromiseExecutor,
    PromiseFactory
} from "../utils/cancellablePromise";
import {sleep} from "../utils/sleep";

export interface PromiseLibrary
{
    // promise<T>(executor: PromiseExecutor<T>): Promise<T>;
    // show(message: string): Promise<void>;
    sleep(ms: number): Promise<void>;
    // wait(predicate: () => boolean): Promise<void>;
}

export function makePromiseLibrary(cancellationToken: CancellationToken): PromiseLibrary
{
    const promiseFactory = makeCancellablePromiseFactory(cancellationToken);
    function wrapPromise<T>(promise: Promise<T>)
    {
        return promiseFactory(async resolve => resolve(await promise));
    }

    return {
        sleep: (ms: number) => wrapPromise(sleep(ms)) as Promise<void>
        // promise<T>(executor: PromiseExecutor<T>): Promise<T> {
        //     return promiseFactory(executor);
        // },
        // show(message: string): Promise<void> {
        // }
    }
}

