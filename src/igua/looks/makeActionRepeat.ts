import {DisplayObject} from "pixi.js";
import {Action, Input} from "../io/input";

export function makeActionRepeat(o: DisplayObject, action: Action) {
    let keyDownFor = 0;
    let repeats = 0;
    let justWentDown = false;

    function reset() {
        keyDownFor = 0;
        repeats = 0;
        justWentDown = false;
    }

    o.withStep(() => {
        if (!Input.isDown(action))
            reset();
        else {
            keyDownFor++;
            justWentDown = keyDownFor === 1
                || (keyDownFor % 2 === 0 && keyDownFor > 15);
            if (justWentDown)
                repeats++;
        }
    });

    return {
        get justWentDown() {
            return justWentDown;
        },
        get repeats() {
            return repeats;
        },
        reset
    }
}
