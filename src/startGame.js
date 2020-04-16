import {player} from "./gameObjects/player";
import {game} from "./igua/game";
import {stepPlayerCamera} from "./igua/playerCamera";
import {loadLevel} from "./igua/level";
import {Test} from "./levels";

export function startGame()
{
    game.player = player();
    game.ticker.add(stepPlayerCamera);

    loadLevel(Test);

    game.stage.addChild(game.player);
}