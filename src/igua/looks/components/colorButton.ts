import {button} from "./button";
import {PageElement} from "../../ui/page";
import {ColorInput} from "../looksModel";
import {rng} from "../../../utils/rng";
import {valueSlider} from "./valueSlider";
import {colord} from "colord";
import {toHexColorString} from "../../../utils/toHexColorString";
import {Graphics} from "pixi.js";
import {looksContext} from "./looksUiRoot";
import {merge} from "../../../utils/object/merge";
import {Key} from "../../../utils/browser/key";
import {findColorValues} from "../findColorValues";

function readHsv(input) {
    const hex = toHexColorString(input.value);
    const color = colord(hex);
    return color.toHsv();
}

export function colorButton(text: string, onPress: () => unknown, input :{ value }) {
    const b = button(text, onPress);
    b.addChild(new Graphics().beginFill(input.value).drawPolygon([4, 4, 4, 26, 26, 4]));
    return b;
}

export function makeColorPageElements(input: ColorInput & { value }) {
    const el: PageElement[] = [];
    let h: number, s: number, v: number;

    function writeColor() {
        const color = colord({ h, s, v, a: 1 });
        input.value = color.toPixi();
    }

    const hh = {
        get() {
            return h;
        },
        set(x) {
            h = x;
            writeColor();
        }
    }

    const ss = {
        get() {
            return s;
        },
        set(x) {
            s = x;
            writeColor();
        }
    }

    const vv = {
        get() {
            return v;
        },
        set(x) {
            v = x;
            writeColor();
        }
    }

    function readColor() {
        const hsv = readHsv(input)
        h = hsv.h;
        s = hsv.s;
        v = hsv.v;
    }

    readColor();

    function gotoCopyFrom() {
        const elements = makeCopyFromPageElements(input.value, x => input.value = x);
        looksContext.into('Copy', elements);
    }

    el.push(valueSlider('Hue', { min: 0, max: 359 }, hh, [5, 5, 7]));
    el.push(valueSlider('Saturation', { min: 0, max: 100 }, ss, [2, 2, 2]));
    el.push(valueSlider('Value', { min: 0, max: 100 }, vv, [2, 2, 2]));

    const random = button('Random', () => {
        input.value = rng.color;
        readColor();
    })
        .center()
        .jiggle();

    el.push(random);
    el.push(button('Copy From...', gotoCopyFrom).center());
    el.push(button('OK', looksContext.back));

    el[0].on('added', () => {
        const gfx = new Graphics().withStep(() => {
            gfx
                .clear()
                .beginFill(input.value, 1)
                .drawRect(el[0].x + 96 + 3, el[0].y, 16, dy * 3 - 3);
        })
        el[0].parent.addChild(gfx);
    });

    const dy = 33;
    el[1].y = dy;
    el[2].y = dy * 2;
    el[3].y = dy * 3 + 15;
    el[4].y = dy * 4 + 15;
    el[5].y = dy * 5 + 30;

    return el;
}

function copyButton(color: number, onSelect: () => unknown, onPress: () => unknown, w: number, h: number) {
    const p = 4;

    const g = merge(new Graphics(), { selected: false }).withStep(() => {
        g
            .clear()
            .beginFill(g.selected ? 0x00FF00 : 0x005870)
            .drawRect(0, 0, w, h)
            .beginFill(color)
            .drawPolygon([p, p, p, h - p, w - p, p]);

        if (g.selected) {
            onSelect();
            if (Key.justWentDown('Space'))
                onPress();
        }
    });

    return g;
}

function makeCopyFromPageElements(currentColor: number, set: (color: number) => unknown): PageElement[] {
    const colors = findColorValues(looksContext.inputModel);
    const uniqueColors = Array.from(new Set(colors));

    const elements: PageElement[] = [];

    const w = 30;
    const h = 30;
    const m = 3;

    let ax = 0;
    let ay = 0;

    for (let i = 0; i < uniqueColors.length; i++) {
        if (i > 0) {
            if (ax > 60) {
                ax = 0;
                ay += h + m;
            }
            else
                ax += w + m;
        }

        const c = uniqueColors[i];
        const elem = copyButton(c, () => set(c), looksContext.back, w, h).at(ax, ay);
        elem.selected = c === currentColor;
        elements.push(elem);
    }

    return elements;
}
