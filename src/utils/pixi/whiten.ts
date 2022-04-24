import {DisplayObject, filters} from "pixi.js";

export function whiten(d: DisplayObject) {
    const filter = new filters.ColorMatrixFilter();

    if (!d.filters)
        d.filters = [];
    d.filters.push(filter);

    let factor = 0;

    return {
        get factor() {
            return factor;
        },
        set factor(f: number) {
            factor = f;
            filter.matrix = [
                1, 0, 0, 0, f,
                0, 1, 0, 0, f,
                0, 0, 1, 0, f,
                0, 0, 0, 1, 0];
        }
    };
}