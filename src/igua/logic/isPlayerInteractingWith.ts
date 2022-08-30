import {DisplayObject} from "pixi.js";
import {PlayerCharacterInput} from "./playerCharacterInput";
import {player} from "../../gameObjects/player";

export function isPlayerInteractingWith(object: DisplayObject)
{
    return PlayerCharacterInput.justWentDown("Interact") && object.collides(player);
}

export function isPlayerMoving() {
    return Math.abs(player.hspeed) > 0.1 || Math.abs(player.vspeed) > 0.1;
}
