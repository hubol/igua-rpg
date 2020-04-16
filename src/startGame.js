import {player} from "./player";
import {game} from "./game";
import {stepPlayerCamera} from "./playerCamera";
import {loadLevel} from "./level";
import {Test} from "./levels";

export function startGame()
{
    game.player = player();
    game.ticker.add(stepPlayerCamera);

    loadLevel(Test);

    game.stage.addChild(game.player);
}