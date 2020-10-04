import {show} from "./dialog";
import {CancellationToken, sleep, wait} from "pissant";
import {tickerSleep} from "../utils/tickerSleep";
import {tickerWait} from "../utils/tickerWait";
import {ask} from "./ask";
import {move} from "./move";

const promiseLibrary = {
    sleep: tickerSleep,
    wait: tickerWait,
    show,
    ask,
    timeoutSleep: sleep,
    timeoutWait: wait,
    move
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

