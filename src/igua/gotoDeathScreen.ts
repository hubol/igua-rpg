import {level} from "./level/level";
import {game} from "./game";

export function gotoDeathScreen()
{
    level.clear();
    game.player.isDead = true;
    game.backgroundColor = 0x000000;
}