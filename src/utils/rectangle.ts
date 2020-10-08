import {Vector} from "./vector";

export function rectangleContainsVector(r: Rectangle, v: Vector)
{
    return v.x >= r.x && v.y >= r.y && v.x < r.x + r.width && v.y < r.y + r.height;
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
    return {x: rectangle.x, y: rectangle.y, width: rectangle.width, height: rectangle.height};
}

export interface Rectangle
{
    x: number;
    y: number;
    width: number;
    height: number;
}