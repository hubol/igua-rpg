import {Container} from "pixi.js";
import {game} from "../game";
import {loadLevel, unloadLevel} from "../level";
import {areRectanglesOverlapping} from "../utils/math";
import * as levels from "../levels";
import {Test} from "../levels";

export function gate(x, y, width, height, destination: { checkpointName, levelName })
{
    const container = new Container();
    const bounds = { x, y, width, height };

    const step = () => {
        if (areRectanglesOverlapping(game.player.rectangle, bounds))
        {
            unloadLevel();
            loadLevel(getLevel(destination.levelName), destination.checkpointName);
        }
    };

    container.on("added", () => game.ticker.add(step));
    container.on("removed", () => game.ticker.remove(step));
    return container;
}

function getLevel(name)
{
    if (name in levels)
        return levels[name];
    return Test;
}