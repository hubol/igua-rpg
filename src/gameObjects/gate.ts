import {Container} from "pixi.js";
import {EscapeTickerAndExecute} from "../utils/asshatTicker";
import {Gate} from "../sounds";
import {progress} from "../igua/data/progress";
import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {level} from "../igua/level/level";
import {areRectanglesOverlapping} from "../utils/math/rectangle";
import {scene} from "../igua/scene";
import {player} from "./player";

export const resolveGate = resolveGameObject("Gate", args => {
    const anyEntity = args as any;

    const destination = {
        levelName: anyEntity.levelName,
        checkpointName: anyEntity.checkpointName,
    };
    return scene.gameObjectStage.addChild(gate(args.x, args.y, args.width, args.height, destination));
});

export function gate(x, y, width, height, destination: { checkpointName, levelName })
{
    const bounds = { x, y, width, height };

    const container = new Container();

    return container.withStep(() => {
        if (areRectanglesOverlapping(player.rectangle, bounds))
        {
            Gate.volume(0.4);
            Gate.play();
            throw new EscapeTickerAndExecute(
                () => {
                    progress.checkpointName = destination.checkpointName;
                    level.goto(destination.levelName)
                });
        }
    });
}