import {Container, Graphics} from "pixi.js";
import {EscapeTickerAndExecute} from "../utils/asshatTicker";
import {Gate} from "../sounds";
import {progress} from "../igua/data/progress";
import {level} from "../igua/level/level";
import {areRectanglesOverlapping} from "../utils/math/rectangle";
import {scene} from "../igua/scene";
import {player} from "./player";
import {resolveGameObject} from "../igua/level/resolveGameObject";

export const resolveGate = resolveGameObject("Gate", args => {
    const destination = {
        levelName: args.levelName,
        checkpointName: args.checkpointName,
    };
    return scene.gameObjectStage.addChild(gate(args.x, args.y, args.width, args.height, destination));
});

export function gate(x, y, width, height, destination: { checkpointName, levelName })
{
    const bounds = { x, y, width, height };

    const container = new Graphics().drawRect(0, 0, width, height).at(x, y);

    return container.withStep(() => {
        if (areRectanglesOverlapping(player.rectangle, bounds))
        {
            Gate.volume(0.4);
            Gate.play();
            throw new EscapeTickerAndExecute(
                () => {
                    progress.checkpointName = destination.checkpointName;
                    level.goto(destination.levelName);
                });
        }
    });
}
