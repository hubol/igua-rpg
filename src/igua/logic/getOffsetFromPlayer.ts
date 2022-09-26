import {DisplayObject} from "pixi.js";
import {getWorldCenter} from "../gameplay/getCenter";
import {player} from "../../gameObjects/player";

export function getOffsetFromPlayer(src: DisplayObject) {
    return getWorldCenter(src).add(player, -1).scale(-1);
}

export function hSignToPlayer(src: DisplayObject) {
    return Math.sign(getOffsetFromPlayer(src).x);
}

export function hDistFromPlayer(src: DisplayObject) {
    return Math.abs(getOffsetFromPlayer(src).x);
}