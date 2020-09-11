import {level} from "./level/level";
import {game, recreatePlayer} from "./game";
import {Test} from "../levels/testLevel";

export function gotoDeathScreen()
{
    level.clear();
    game.player.isDead = true;
    game.backgroundColor = 0x000000;
    setTimeout(() => {
        recreatePlayer();
        level.gotoSync("Test");
    },
    4_000)
}