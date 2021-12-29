import {LooksInput} from "../looksModel";
import {Container} from "pixi.js";
import {button} from "./button";
import {capitalizeFirstLetter} from "../../../utils/capitalizeFirstLetter";
import {Key} from "../../../utils/browser/key";
import {cyclic} from "../../../utils/math/number";

type BoundInput = { kind: LooksInput['kind'], value };
type BoundInputModel = Record<string, BoundInput | {}>;

export type PageState = { selectionIndex: number };

type PageArgs = {
    boundInputModel: BoundInputModel;
    back?();
    done?();
    into(page: string);
    state: PageState;
}

export function page({ into, state, boundInputModel, back, done }: PageArgs) {
    const c = new Container();

    const elements: (Container & { selected: boolean })[] = [];
    for (const [key, value] of Object.entries(boundInputModel)) {
        if ('kind' in value) {
            // TODO impl
        }
        else {
            elements.push(button(capitalizeFirstLetter(key), () => into(key)));
        }
    }

    if (back)
        elements.push(button('Back', back));
    if (done)
        elements.push(button('Done', done));
    const hasSpecialElement = back || done;

    let y = 0;
    for (const e of elements) {
        if (hasSpecialElement && e === elements[elements.length - 1])
            y += 15;
        e.y = y;
        y += Math.max(30, e.height) + 3;
    }

    c.addChild(...elements);
    c.withStep(() => {
        // TODO focus here should be disabled for certain inputs
        if (Key.justWentDown('ArrowUp'))
           state.selectionIndex -= 1;
        if (Key.justWentDown('ArrowDown'))
           state.selectionIndex += 1;
        state.selectionIndex = cyclic(state.selectionIndex, 0, elements.length);
        elements.forEach((x, i) => x.selected = state.selectionIndex === i)
        // TODO sound
    });

    return c;
}
