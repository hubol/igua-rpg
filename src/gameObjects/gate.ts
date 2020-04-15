import {Container} from "pixi.js";
import {game} from "../game";
import {gotoLevel} from "../level";
import {areRectanglesOverlapping} from "../utils/math";
import * as levels from "../levels";
import {Test} from "../levels";

export function gate(x, y, width, height, destination: { checkpointName, levelName })
{
    const bounds = { x, y, width, height };

    const container = new Container();

    return container.withStep(() => {
        if (areRectanglesOverlapping(game.player.rectangle, bounds))
        {
            gotoLevel(getLevel(destination.levelName), destination.checkpointName);
        }
    });
}

function getLevel(name)
{
    if (name in levels)
        return levels[name];
    return Test;
}