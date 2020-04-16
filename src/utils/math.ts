import {Vector} from "./vector";

export function lerp(a: number, b: number, factor: number)
{
    return a * (1 - factor) + b * factor;
}

export function lerpVector(a: Vector, b: Vector, factor: number): Vector
{
    a.x = lerp(a.x, b.x, factor);
    a.y = lerp(a.y, b.y, factor);
    return a;
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

export function normalizeRectangle(rectangle: Rectangle)
{
    if (rectangle.width < 0)
    {
        rectangle.x += rectangle.width;
        rectangle.width *= -1;
    }

    if (rectangle.height < 0)
    {
        rectangle.y += rectangle.height;
        rectangle.height *= -1;
    }

    return rectangle;
}

export function rectangle(rectangle: Rectangle)
{
    return { x: rectangle.x, y: rectangle.y, width: rectangle.width, height: rectangle.height };
}

interface Rectangle
{
    x: number;
    y: number;
    width: number;
    height: number;
}