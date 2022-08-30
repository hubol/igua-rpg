import {Container, DisplayObject} from "pixi.js";
import {page} from "./page";
import {merge} from "../../utils/object/merge";
import {LooksPageInto, SelectOption} from "../../sounds";
import {advanceInput} from "../io/input";

export function pageRoot({ playSounds = true } = {}) {
    const pageContainer = new Container();

    const goto: typeof page = (elements, state) => {
        if (playSounds && pageContainer.children.length > 0)
            LooksPageInto.play();
        const p = page(elements, state);

        if (playSounds) {
            let lastSelectionIndex = state.selectionIndex;
            p.withStep(() => {
                if (lastSelectionIndex !== state.selectionIndex)
                    SelectOption.play();
                lastSelectionIndex = state.selectionIndex;
            });
        }

        pageContainer.removeAllChildren();
        pageContainer.addChild(p);
        advanceInput();
        pageContainer.ticker.update();
        return p;
    };

    return merge(pageContainer as DisplayObject, { goto });
}