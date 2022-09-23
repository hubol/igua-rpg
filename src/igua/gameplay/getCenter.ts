import {player} from "../../gameObjects/player";
import {DisplayObject, Rectangle} from "pixi.js";
import {scene} from "../scene";
import {vnew} from "../../utils/math/vector";

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

export function getWorldBounds(d: DisplayObject): Rectangle {
    return <Rectangle>d.getBounds(false, r).add(scene.camera);
}

const v = vnew();

export function getWorldPos(d: DisplayObject) {
    return v.at(d.worldTransform.tx, d.worldTransform.ty).add(scene.camera);
}