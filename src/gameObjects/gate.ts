import {Container} from "pixi.js";
import {game} from "../game";
import {loadLevel, unloadLevel} from "../level";
import {areRectanglesOverlapping} from "../utils/math";

export function gate(x, y, width, height, destination: { checkpointName, levelName })
{
    const container = new Container();
    const bounds = { x, y, width, height };

    const step = () => {
        if (areRectanglesOverlapping(game.player, bounds))
        {
            unloadLevel();
            loadLevel(require("../levels/right-test.json"));
        }
    };

    container.on("added", () => game.ticker.add(step));
    container.on("removed", () => game.ticker.remove(step));
    return container;
}