import {DisplayObject} from "pixi.js";
import {Vector} from "../utils/math/vector";

export function trackPosition(target: DisplayObject) {
    let firstStep = false;
    const current = {} as Vector;
    const previous = {} as Vector;
    const diff = {} as Vector;
    target.withStep(() => {
        firstStep = true;
        previous.at(current)
        current.at(target);
        diff.at(current).add(previous, -1);
    });

    target.transform.onPositionChanged(() => {
        if (firstStep) return;
        current.at(target);
    })

    return {
        current,
        previous,
        diff,
    }
}
