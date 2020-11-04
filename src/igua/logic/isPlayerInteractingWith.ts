import {DisplayObject} from "pixi.js";
import {playerCharacterKey} from "./playerCharacterKey";
import {player} from "../../gameObjects/player";

export function isPlayerInteractingWith(object: DisplayObject)
{
    return playerCharacterKey.justWentDown("ArrowUp") && object.collides(player);
}