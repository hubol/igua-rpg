import {Container} from "pixi.js";
import {cyclic} from "../../utils/math/number";
import {merge} from "../../utils/object/merge";
import {Input} from "../io/input";

export type PageState = { selectionIndex: number };
export type PageElement = Container & { selected: boolean };

export function page(elements: PageElement[], state: PageState) {
    const c = merge(new Container(), { navigation: true, state });
    updateSelection();

    function updateSelection() {
        state.selectionIndex = cyclic(state.selectionIndex, 0, elements.length);
        elements.forEach((x, i) => x.selected = state.selectionIndex === i)
    }

    function select(dx: number, dy: number) {
        const selected = elements[state.selectionIndex];
        dx = Math.sign(dx) * 16;
        dy = Math.sign(dy) * 16;
        let ax = dx;
        let ay = dy;
        let d = 0;
        let fromBehind = false;
        const dd = Math.abs(dx) + Math.abs(dy);
        while (d < 600) {
            const offset = [-ax, -ay];
            for (let i = 0; i < elements.length; i++) {
                if (i === state.selectionIndex)
                    continue;
                if (elements[i].collides(selected, offset)) {
                    state.selectionIndex = i;
                    return;
                }
            }
            ax += dx;
            ay += dy;
            d += dd;
            if (!fromBehind && d >= 256) {
                ax = Math.sign(dx) * -256;
                ay = Math.sign(dy) * -256;
                fromBehind = true;
            }
        }
    }

    c.addChild(...elements);
    c.withStep(() => {
        if (c.navigation) {
            if (Input.justWentDown('SelectUp'))
                select(0, -1);
            if (Input.justWentDown('SelectDown'))
                select(0, 1);
            if (Input.justWentDown('SelectLeft'))
                select(-1, 0);
            if (Input.justWentDown('SelectRight'))
                select(1, 0);
        }
        updateSelection();
    });

    return c;
}

export type Page = ReturnType<typeof page>;
