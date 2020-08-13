import {Container} from "pixi.js";
import {game} from "../igua/game";
import {areRectanglesOverlapping} from "../utils/math";
import {EscapeTickerAndExecute} from "../utils/iguaTicker";
import {Gate} from "../sounds";
import {progress} from "../igua/progress";
import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {level} from "../igua/level/level";

export const resolveGate = resolveGameObject("Gate", args => {
    const anyEntity = args as any;

    const destination = {
        levelName: anyEntity.levelName,
        checkpointName: anyEntity.checkpointName,
    };
    return game.gameObjectStage.addChild(gate(args.x, args.y, args.width, args.height, destination));
});

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
                () => {
                    progress.checkpointName = destination.checkpointName;
                    return level.goto(destination.levelName)
                });
        }
    });
}