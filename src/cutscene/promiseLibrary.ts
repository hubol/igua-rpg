import {show} from "./dialog";
import {tickerSleep} from "../utils/tickerSleep";
import {tickerWait} from "../utils/tickerWait";
import {ask} from "./ask";
import {move} from "./move";
import {IguaPromiseConfig} from "./iguaPromiseConfig";

const promiseLibrary = {
    sleep: tickerSleep,
    wait: tickerWait,
    show,
    ask,
    move
};

export type PromiseLibrary = typeof promiseLibrary;

export function makePromiseLibrary(config: IguaPromiseConfig): PromiseLibrary
{
    function wrapPromise(promiseFactory): any
    {
        return function () {
            const augmentedArguments = Array.prototype.slice.call(arguments);
            augmentedArguments.push(config);
            return promiseFactory.apply(null, augmentedArguments);
        };
    }

    const library = {  };
    Object.keys(promiseLibrary).map(key => library[key] = wrapPromise(promiseLibrary[key]));

    return library as any;
}

