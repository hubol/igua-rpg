import {Graphics} from "pixi.js";

export class Hbox extends Graphics {
    constructor(x: number, y: number, width: number, height: number, visible = false, color = 0xff0000) {
        super();
        this.beginFill(color).drawRect(x, y, width, height);
        this.visible = visible;
    }
}