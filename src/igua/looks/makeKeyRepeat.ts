import {DisplayObject} from "pixi.js";
import {Key, KeyCode} from "../../utils/browser/key";

export function makeKeyRepeat(o: DisplayObject, keyCode: KeyCode) {
    let keyDownFor = 0;
    let repeats = 0;
    let justWentDown = false;

    function reset() {
        keyDownFor = 0;
        repeats = 0;
        justWentDown = false;
    }

    o.withStep(() => {
        if (!Key.isDown(keyCode))
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
