import {Vector} from "../utils/math/vector";
import {Sprite} from "pixi.js";
import {LockedDoor, OpenDoor} from "../textures";
import {merge} from "../utils/merge";
import {isPlayerInteractingWith} from "../igua/logic/isPlayerInteractingWith";
import {EscapeTickerAndExecute} from "../utils/asshatTicker";
import {progress} from "../igua/data/progress";
import {level} from "../igua/level/level";
import {scene} from "../igua/scene";
import {cutscene} from "../cutscene/cutscene";
import {show} from "../cutscene/dialog";
import {resolveGameObject} from "../igua/level/resolveGameObject";

export const resolveDoor =
    resolveGameObject("Door", e => door(e, e.levelName, e.checkpointName));

function door(vector: Vector, levelName: string, checkpointName: string)
{
    const sprite = merge(Sprite.from(OpenDoor), { locked: false, levelName, checkpointName })
        .at(vector)
        .withStep(() => {
            sprite.texture = sprite.locked ? LockedDoor : OpenDoor;
            if (isPlayerInteractingWith(sprite))
            {
                if (!sprite.locked)
                    throw new EscapeTickerAndExecute(
                        () => {
                            progress.checkpointName = sprite.checkpointName;
                            level.goto(sprite.levelName);
                        });

                cutscene.play(async () => await show("The door is locked."));
            }
        });
    return scene.gameObjectStage.addChild(sprite);
}
