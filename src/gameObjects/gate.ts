import {Container} from "pixi.js";
import {game} from "../igua/game";
import {gotoLevel} from "../igua/level";
import {areRectanglesOverlapping} from "../utils/math";
import * as levels from "../ogmoLevels";
import {Test} from "../ogmoLevels";
import {EscapeTickerAndExecute} from "../utils/iguaTicker";
import {Gate} from "../sounds";
import {EntityCommon} from "../igua/level/createGameObjects";

export function resolveGate(entity: EntityCommon)
{
    const anyEntity = entity as any;

    const destination = {
        levelName: anyEntity.levelName,
        checkpointName: anyEntity.checkpointName,
    };
    return game.gameObjectStage.addChild(gate(entity.x, entity.y, entity.width, entity.height, destination));
}

export function gate(x, y, width, height, destination: { checkpointName, levelName })
{
    const bounds = { x, y, width, height };

    const container = new Container();

    return container.withStep(() => {
        if (areRectanglesOverlapping(game.player.rectangle, bounds))
        {
            Gate.volume(0.4);
            Gate.play();
            throw new EscapeTickerAndExecute(
                () => gotoLevel(getLevel(destination.levelName), destination.checkpointName));
        }
    });
}

function getLevel(name)
{
    if (name in levels)
        return levels[name];
    return Test;
}