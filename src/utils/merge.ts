export function merge<T, U>(target: T, source: U): T & U
{
    return Object.assign(target, source);
}