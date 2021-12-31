import {Container} from "pixi.js";
import {Key} from "../../../utils/browser/key";
import {cyclic} from "../../../utils/math/number";

export type PageState = { selectionIndex: number };
export type PageElement = Container & { selected: boolean };

export function page(elements: PageElement[], state: PageState) {
    const c = new Container();

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
