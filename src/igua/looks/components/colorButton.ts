import {button} from "./button";
import {PageElement} from "./page";
import {ColorInput, LooksInputModel} from "../looksModel";
import {rng} from "../../../utils/rng";

type Args = {
    input: ColorInput & { value };
    model: LooksInputModel;
    done();
}

export function makeColorPageElements({ model, input, done }: Args) {
    const el: PageElement[] = [];

    // TODO value sliders
    el.push(button('Hue', () => {}));
    el.push(button('Saturation', () => {}));
    el.push(button('Value', () => {}));
    el.push(button('Random', () => input.value = rng.int(0xFFFFFF + 1)));
    el.push(button('Copy From...', () => {}));
    el.push(button('OK', done));

    const h = 33;
    el[1].y = h;
    el[2].y = h * 2;
    el[3].y = h * 3 + 15;
    el[4].y = h * 4 + 15;
    el[5].y = h * 5 + 30;

    return el;
}
