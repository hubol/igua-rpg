import {player} from "../../gameObjects/player";
import {DisplayObject, Rectangle} from "pixi.js";
import {scene} from "../scene";

const r = new Rectangle();

export function getPlayerCenter() {
    return getCenter(player);
}

export function getPlayerCenterWorld() {
    return getCenter(player).add(scene.camera);
}

export function getCenter(d: DisplayObject) {
    return d.getBounds(false, r).center.vround();
}

export function getWorldCenter(d: DisplayObject) {
    return getCenter(d).add(scene.camera);
}

export function getWorldBounds(d: DisplayObject) {
    return d.getBounds(false, r).add(scene.camera);
}