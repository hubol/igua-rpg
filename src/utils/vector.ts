export interface Vector
{
    x: number;
    y: number;
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