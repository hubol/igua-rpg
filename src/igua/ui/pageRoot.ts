import {Container, DisplayObject} from "pixi.js";
import {page} from "./page";
import {advanceKeyListener} from "../../utils/browser/key";
import {merge} from "../../utils/merge";

export function pageRoot() {
    const pageContainer = new Container();

    const goto: typeof page = (elements, state) => {
        const p = page(elements, state);
        pageContainer.removeAllChildren();
        pageContainer.addChild(p);
        advanceKeyListener();
        pageContainer.ticker.update();
        return p;
    };

    return merge(pageContainer as DisplayObject, { goto });
}