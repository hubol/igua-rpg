// https://stackoverflow.com/a/50270314

function hasOwn(obj, prop)
{
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function merge<T, U>(target: T, source: U): T & U {
    for (const key in source) {
        if (hasOwn(source, key)) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key) as any);
        }
    }
    return target as T & U;
}