import {show} from "./dialog";
import {tickerSleep} from "./tickerSleep";
import {tickerWait} from "./tickerWait";
import {ask} from "./ask";
import {move} from "./move";
import {IguaPromiseConfig} from "./iguaPromiseConfig";
import {lerp} from "./lerp";

const promiseLibrary = {
    sleep: tickerSleep,
    wait: tickerWait,
    show,
    ask,
    move,
    lerp
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

