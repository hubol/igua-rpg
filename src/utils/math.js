export function lerp(a, b, factor)
{
    return a * (1 - factor) + b * factor;
}