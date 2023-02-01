import {Container, DisplayObject, Graphics} from "pixi.js";
import {EscapeTickerAndExecute} from "../utils/asshatTicker";
import {Gate} from "../sounds";
import {progress} from "../igua/data/progress";
import {level} from "../igua/level/level";
import {areRectanglesOverlapping} from "../utils/math/rectangle";
import {scene} from "../igua/scene";
import {player} from "./player";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {merge} from "../utils/object/merge";
import {Undefined} from "../utils/types/undefined";

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

    const container = merge(new Graphics(), { active: true, collisionBox: Undefined<DisplayObject>() });
    container.drawRect(0, 0, width, height).at(x, y);

    return container.withStep(() => {
        if (container.active && (
            (container.collisionBox && container.collisionBox.collides(player))
            || (!container.collisionBox && areRectanglesOverlapping(player.rectangle, bounds))))
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
