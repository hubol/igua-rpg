import {filters} from "pixi.js";
import {toHexColorString} from "../toHexColorString";
import {colord} from "colord";

export function mapRgb(filter: filters.ColorMatrixFilter, red = 0, green = 0, blue = 0 ) {
    const r = colord(toHexColorString(red)).toRgb();
    const g = colord(toHexColorString(green)).toRgb();
    const b = colord(toHexColorString(blue)).toRgb();

    filter.matrix = [
        r.r / 255, g.r / 255, b.r / 255, 0, 0,
        r.g / 255, g.g / 255, b.g / 255, 0, 0,
        r.b / 255, g.b / 255, b.b / 255, 0, 0,
        0, 0, 0, 1, 0];

    return filter;
}