import {DisplayObject} from "pixi.js";

export function trackPosition(target: DisplayObject) {
    let firstStep = false;
    const current = target.vcpy();
    const previous = target.vcpy();
    const diff = [0, 0].vcpy();
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
