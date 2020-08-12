export function mergeFunctionLeaves(object: any)
{
    const result = {};
    const next = [object];
    while (next.length > 0)
        mergeFunctionLeavesImpl(next.pop(), result, next);
    return result as {
        [index: string]: (...args: any) => any;
    };
}

function mergeFunctionLeavesImpl(current: any, result: any, next: any[])
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