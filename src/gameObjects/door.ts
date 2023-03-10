import {Sprite} from "pixi.js";
import {LockedDoor, OpenDoor} from "../textures";
import {merge} from "../utils/object/merge";
import {isPlayerInteractingWith} from "../igua/logic/isPlayerInteractingWith";
import {EscapeTickerAndExecute} from "../utils/asshatTicker";
import {progress} from "../igua/data/progress";
import {level} from "../igua/level/level";
import {cutscene} from "../cutscene/cutscene";
import {show} from "../cutscene/dialog";
import {resolveGameObject} from "../igua/level/resolveGameObject";

export const resolveDoor =
    resolveGameObject("Door", e => door(e.levelName, e.checkpointName).at(e));

function door(levelName: string, checkpointName: string)
{
    function enter() {
        progress.checkpointName = sprite.checkpointName;
        level.goto(sprite.levelName);
    }

    const sprite = merge(Sprite.from(OpenDoor), { locked: false, levelName, checkpointName, enter, playerCanInteract: true })
        .withStep(() => {
            sprite.texture = sprite.locked ? LockedDoor : OpenDoor;
            if (sprite.playerCanInteract && isPlayerInteractingWith(sprite))
            {
                if (!sprite.locked)
                    throw new EscapeTickerAndExecute(enter);

                if (sprite.ext.showClosedMessage !== false)
                    cutscene.play(async () => await show("Closed."));
            }
        });
    return sprite;
}
