import {Container} from "pixi.js";
import {merge} from "../../../utils/merge";
import {IguaText} from "../../text";
import {capitalizeFirstLetter} from "../../../utils/capitalizeFirstLetter";
import {button} from "./button";
import {getLooksInputModel, Looks} from "../looksModel";
import {bindLooks} from "../bindLooks";
import {page, PageState} from "./page";
import {EscapeTickerAndExecute} from "../../../utils/asshatTicker";

export function looksUiRoot(defaultLooks: Looks) {
    const boundInputModel = getLooksInputModel();
    bindLooks(boundInputModel, defaultLooks);

    const c = merge(new Container(), {
        path: [] as string[],
    });

    const pageContainer = new Container();

    function done() {
        // TODO
    }

    function back() {
        getStateForPath().selectionIndex = 0;
        c.path.pop();
        loadPageForPath();
    }

    function into(page: string) {
        c.path.push(page);
        loadPageForPath();
    }

    const statesByPath = {};
    function getStateForPath(): PageState {
        const key = c.path.join('.');
        if (key in statesByPath)
            return statesByPath[key];
        return statesByPath[key] = { selectionIndex: 0 };
    }

    function getModelSliceForPath() {
        let model = boundInputModel;
        for (const key of c.path)
            model = model[key];
        return model as any;
    }

    function loadPageForPath() {
        pageContainer.removeAllChildren();
        const state = getStateForPath();
        const modelSlice = getModelSliceForPath();
        const p = page({
            into,
            back: c.path.length > 0 ? back : undefined,
            done: c.path.length === 0 ? done : undefined,
            state,
            boundInputModel: modelSlice });
        pageContainer.addChild(p.at(3, 13));
        for (let i = 0; i < 2; i++)
            pageContainer.ticker.update();
    }

    loadPageForPath();

    const breadcrumbs = IguaText.Large()
        .at(3, 0)
        .withStep(() => {
            if (c.path.length === 0)
                breadcrumbs.text = 'Choose your looks.';
            else
                breadcrumbs.text = c.path.map(capitalizeFirstLetter).join(" > ");
        });
    breadcrumbs.tint = 0xbbbbbb;
    c.addChild(breadcrumbs, pageContainer);
    return c;
}
