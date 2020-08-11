import {AnonymousFunction} from "./components/function";
import {Invocation} from "./components/invocation";

export function isPojo(o: any)
{
    if (typeof o !== "object")
        return false;

    const next = [o];
    while (next.length > 0)
    {
        if (isPojoImpl(next.pop(), next) === false)
            return false;
    }

    return true;
}

function isPojoImpl(current: any, next: any[])
{
    for (const key in current)
    {
        const value = current[key];
        if (value instanceof AnonymousFunction || value instanceof Invocation)
            return false;
        if (typeof value === "object")
            next.push(value);
    }
}