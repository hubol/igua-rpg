export function range(x: number) {
    return [...new Array(x)].map((_, i) => i);
}
