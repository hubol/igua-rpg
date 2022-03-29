import {Rectangle} from "../utils/math/rectangle";
import {Graphics} from "pixi.js";

export function wallpaper(r: Rectangle, color: number) {
    const {x, y, width, height} = r;
    return new Graphics().beginFill(color).drawRect(x, y, width, height);
}