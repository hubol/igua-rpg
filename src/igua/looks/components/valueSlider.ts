import {merge} from "../../../utils/object/merge";
import {Graphics} from "pixi.js";
import {Key} from "../../../utils/browser/key";
import {IguaText} from "../../text";
import {makeKeyRepeat} from "../makeKeyRepeat";

interface Binding<T> {
    get(): T;
    set(t: T);
}

type Scalars = [ rate1: number, rate2: number, rate3: number ];

export function valueSlider(
        text: string,
        { min, max },
        { get, set }: Binding<number>,
        [rate1, rate2, rate3]: Scalars = [1, 1, 1],
        width = 96,
        height = 30) {
    min = min ?? -8;
    max = max ?? 8;

    function getRate(repeats) {
        if (repeats > 10)
            return rate3;
        if (repeats > 5)
            return rate2;
        return rate1;
    }

    const g = merge(new Graphics(), { selected: false })
        .withStep(() => {
            if (!g.selected)
                return;

            if (Key.isDown('ArrowLeft') && Key.isDown('ArrowRight')) {
                left.reset();
                right.reset();
            }

            const value = get();
            let adjust = 0;

            if (left.justWentDown)
                adjust = -getRate(left.repeats);
            else if (right.justWentDown)
                adjust = getRate(right.repeats);
            else
                return;

            set(Math.max(min, Math.min(max, value + adjust)));

            // TODO sfx
        })
        .withStep(() => {
            const value = get();
            g.clear().beginFill(0x005870);
            if (g.selected)
                g.lineStyle(2, 0x00FF00, 1, 0);
            g.drawRect(0, 0, width, height);

            g.lineStyle(0);

            const length = max - min;
            const unit = (value - min) / length;

            g.beginFill(0x002C38)
                .drawRect(8, height - 12, width - 16, 4)
                .beginFill(0xFFFFFF)
                .drawRect(8, height - 12, (width - 16) * unit, 4);
        });

    const left = makeKeyRepeat(g,'ArrowLeft');
    const right = makeKeyRepeat(g,'ArrowRight');

    const font = IguaText.Large(text).at(width / 2, 4);
    // @ts-ignore
    font.anchor.set(0.5, 0);
    g.addChild(font);
    return g;
}
