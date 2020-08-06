import {CancellationToken} from "../utils/cancellablePromise";
import {sleep} from "../utils/sleep";
import {wait} from "../utils/wait";
import {show} from "./dialog";

const promiseLibrary = {
    sleep,
    wait,
    show
};

export type PromiseLibrary = typeof promiseLibrary;

export function makePromiseLibrary(cancellationToken: CancellationToken): PromiseLibrary
{
    function wrapPromise(promiseFactory): any
    {
        return function () {
            const augmentedArguments = Array.prototype.slice.call(arguments);
            augmentedArguments.push(cancellationToken);
            return promiseFactory.apply(null, augmentedArguments);
        };
    }

    const library = {  };
    Object.keys(promiseLibrary).map(key => library[key] = wrapPromise(promiseLibrary[key]));

    return library as any;
}

