import {DisplayObject} from "pixi.js";
import {wait} from "../cutscene/wait";
import {merge} from "../utils/object/merge";

export function slidingDoor(d: DisplayObject, openDown: boolean) {
    const height = d.getBounds().height;
    const closedY = d.y;
    const openDeltaY = openDown ? height : -height;
    const openY = d.y + openDeltaY;

    let isOpen = false;
    let isClosed = true;
    let isOpening = false;
    let isClosing = false;
    let openSpeed = 1;
    let closeSpeed = 1;

    const target = [d.x, 0];

    d.withStep(() => {
        if (isOpening || isClosing) {
            target.y = isOpening ? openY : closedY;
            d.moveTowards(target, isOpening ? openSpeed : closeSpeed);
        }
        isClosed = d.y === closedY;
        isOpen = d.y === openY;
    });

    const dd = merge(d, {
        openInstantly() {
            isOpen = true;
            isClosed = false;
            isOpening = false;
            isClosing = false;
            d.y = openY;
            return dd;
        },
        startOpening(speed: number) {
            openSpeed = speed;
            isOpening = true;
            isClosing = false;
        },
        async open(speed: number) {
            this.startOpening(speed);
            await wait(() => isOpen);
        },
        startClosing(speed: number) {
            closeSpeed = speed;
            isOpening = false;
            isClosing = true;
        },
        async close(speed: number) {
            this.startClosing(speed);
            await wait(() => isClosed);
        }
    });

    return dd;
}
