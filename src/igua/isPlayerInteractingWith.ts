import {DisplayObject} from "pixi.js";
import {game} from "./game";
import {playerCharacterKey} from "./playerCharacterKey";

export function isPlayerInteractingWith(object: DisplayObject)
{
    return playerCharacterKey.justWentDown("ArrowUp") && object.collides(game.player);
}