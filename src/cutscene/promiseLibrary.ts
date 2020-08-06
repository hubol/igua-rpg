import {
    CancellationToken,
    makeCancellablePromiseFactory
} from "../utils/cancellablePromise";
import {sleep} from "../utils/sleep";
import {wait} from "../utils/wait";
import {show} from "./dialog";

export interface PromiseLibrary
{
    show(message: string): Promise<void>;
    sleep(ms: number): Promise<void>;
    wait(predicate: () => boolean): Promise<void>;
}

export function makePromiseLibrary(cancellationToken: CancellationToken): PromiseLibrary
{
    const cancellablePromiseFactory = makeCancellablePromiseFactory(cancellationToken);

    function wrapPromise(promiseFactory): any
    {
        return function () {
            const _arguments = arguments;
            return cancellablePromiseFactory(
                async resolve => resolve(await promiseFactory.apply(null, _arguments)));
        };
    }

    const library = { sleep, wait, show };

    Object.keys(library).map(key => library[key] = wrapPromise(library[key]));

    return library as PromiseLibrary;
}

