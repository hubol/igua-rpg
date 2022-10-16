import {Graphics} from "pixi.js";

export function roundWindow(width: number, height: number, bar: number) {
    return new Graphics()
        .beginFill(0xffffff)
        // .drawRect(-1, -1, width + 2, height + 2)
        .drawRect(0, 0, width, height)
        // .endFill()
        .beginHole()
        .drawEllipse(width / 2, height / 2, width / 2, height / 2)
        .endHole()
        .beginFill(0xffffff)
        .drawRect(width / 2 - bar / 2, 0, bar, height)
        .drawRect(0, height / 2 - bar / 2, width, bar);
}