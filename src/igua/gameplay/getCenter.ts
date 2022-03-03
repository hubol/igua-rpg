import {player} from "../../gameObjects/player";
import {DisplayObject, Rectangle} from "pixi.js";

const r = new Rectangle();

export function getPlayerCenter() {
    return getCenter(player);
}

export function getCenter(d: DisplayObject) {
    return d.getBounds(false, r).center.vround();
}