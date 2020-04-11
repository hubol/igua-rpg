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

export function areRectanglesOverlapping(a: Rectangle, b: Rectangle)
{
    return a.x + a.width > b.x
        && a.x < b.x + b.width
        && a.y + a.height > b.y
        && a.y < b.y + b.height;
}

interface Rectangle
{
    x: number;
    y: number;
    width: number;
    height: number;
}