import {lerp as lerpNumber} from "./number";

export interface Vector
{
    x: number;
    y: number;
}

export function vector(vec: Vector)
{
    return { x: vec.x, y: vec.y };
}

export function perpendicular(vec: Vector) {
    const tmp = vec.x;
    vec.x = vec.y;
    vec.y = -tmp;
    return vec;
}

export function dot(vec1: Vector, vec2: Vector) {
    return vec1.x * vec2.x + vec1.y * vec2.y;
}

export function distance(vec1: Vector, vec2: Vector) {
    return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}

export function normalize(vec: Vector) {
    const d = (Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2)));
    if (d === 0) {
        vec.x = 1;
        vec.y = 0;
    } else {
        vec.x /= d;
        vec.y /= d;
    }

    return vec;
}

export function lerp(a: Vector, b: Vector, factor: number): Vector
{
    a.x = lerpNumber(a.x, b.x, factor);
    a.y = lerpNumber(a.y, b.y, factor);
    return a;
}

export function moveTowards(a: Vector, b: Vector, d: number) {
    if(d <= 0)
        return a;
    const sp = distance(a, b);
    if (sp<=d)
    {
        a.x=b.x;
        a.y=b.y;
        return a;
    }
    d=d/sp;
    a.x=a.x*(1-d)+b.x*(d);
    a.y=a.y*(1-d)+b.y*(d);
    return a;
}
