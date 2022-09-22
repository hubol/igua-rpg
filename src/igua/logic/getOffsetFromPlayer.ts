import {DisplayObject} from "pixi.js";
import {getWorldCenter} from "../gameplay/getCenter";
import {player} from "../../gameObjects/player";

export function getOffsetFromPlayer(src: DisplayObject) {
    return getWorldCenter(src).add(player, -1).scale(-1);
}