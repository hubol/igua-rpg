import {Vector} from "../utils/vector";
import {game} from "../igua/game";
import {Sprite} from "pixi.js";
import {LockedDoor, OpenDoor} from "../textures";
import {merge} from "../utils/merge";
import {isPlayerInteractingWith} from "../igua/isPlayerInteractingWith";
import {show} from "../cutscene/dialog";
import {EscapeTickerAndExecute} from "../utils/iguaTicker";
import {progress} from "../igua/progress";
import {gotoLevel} from "../igua/level";
import {resolveGameObject} from "../../gen-levelargs/resolveGameObject";

export const resolveDoor =
    resolveGameObject("Door", e => door(e, (e as any).levelName, (e as any).checkpointName));

function door(vector: Vector, levelName: string, checkpointName: string)
{
    const sprite = merge(Sprite.from(OpenDoor), { locked: false })
        .at(vector)
        .withStep(() => {
            sprite.texture = sprite.locked ? LockedDoor : OpenDoor;
            if (isPlayerInteractingWith(sprite))
            {
                if (!sprite.locked)
                    throw new EscapeTickerAndExecute(
                        () => {
                            progress.checkpointName = checkpointName;
                            return gotoLevel(levelName)
                        });

                game.cutscenePlayer.playCutscene(async () => await show("The door is locked."));
            }
        });
    return game.gameObjectStage.addChild(sprite);
}