/**
    Takes an object and returns its leaves that are JavaScript Functions as a "flattened" object. e.g.
 ```
const obj1 = {
    hello() {
        return;
    },
    a: {
        goodbye() {
            return;
        }
    }
}
 ```
    becomes
 ```
 {
    hello() {
        return;
    },
    goodbye() {
        return;
    }
 }
 ```
 */
export function flattenFunctionLeaves(object: any)
{
    const result = {};
    const next = [object];
    while (next.length > 0)
        flattenFunctionLeavesImpl(next.pop(), result, next);
    return result as Record<string, (...args: any) => any>;
}

function flattenFunctionLeavesImpl(current: any, result: any, next: any[])
{
    if (typeof current !== "object" || Array.isArray(current))
        return;

    const keys = Object.keys(current);
    for (const key of keys)
    {
        const value = current[key];
        if (typeof value === "function")
        {
            result[key] = value;
            continue;
        }

        next.push(value);
    }
}
