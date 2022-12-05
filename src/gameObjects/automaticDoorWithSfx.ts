import {slidingDoor} from "./slidingDoor";
import {LoopingSounds} from "../pixins/loopingSounds";
import {DragRockLow} from "../sounds";
import {getOffsetFromPlayer} from "../igua/logic/getOffsetFromPlayer";

type Args = [ ...Parameters<typeof slidingDoor>, () => boolean ];

export function automaticDoorWithSfx(...[ d, openDown, predicate ]: Args) {
    const door = slidingDoor(d, openDown)
        .withPixin(LoopingSounds({ DragRockLow }));

    if (predicate())
        door.openInstantly();

    let yprev = door.y;

    door.withStep(() => {
        if (predicate())
            door.startOpening(0.3);
        else
            door.startClosing(0.3);

        if (yprev !== door.y) {
            door.DragRockLow.play();
            door.DragRockLow.volume = 0.3 + Math.max(0, 1 - Math.abs(getOffsetFromPlayer(door).x) / 256);
        }
        else
            door.DragRockLow.fade(0, 200);
        yprev = door.y;
    })
}