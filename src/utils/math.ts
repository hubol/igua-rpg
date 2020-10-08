export function lerp(a: number, b: number, factor: number)
{
    return a * (1 - factor) + b * factor;
}

export function approachLinear(a: number, b: number, factor: number)
{
    if (a < b)
        return Math.min(a + factor, b);
    else if (a > b)
        return Math.max(a - factor, b);
    return b;
}