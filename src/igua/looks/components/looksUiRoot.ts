import {Container} from "pixi.js";
import {merge} from "../../../utils/merge";
import {IguaText} from "../../text";
import {getLooksInputModel, Looks} from "../looksModel";
import {bindLooks} from "../bindLooks";
import {page, PageElement, PageState} from "./page";
import {makeModelPageElements} from "./makeModelPageElements";
import {makeColorPageElements} from "./colorButton";
import {camelCaseToCapitalizedSpace} from "../../../utils/camelCaseToCapitalizedSpace";

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

    function into(page: string, elements?: PageElement[]) {
        c.path.push(page);
        loadPageForPath(elements);
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

    function getElementsForPath() {
        const modelSlice = getModelSliceForPath();
        if (modelSlice.kind) {
            if (modelSlice.kind === 'color')
                return makeColorPageElements({ model: boundInputModel, input: modelSlice, done: back });
        }
        return makeModelPageElements({
            into,
            back: c.path.length > 0 ? back : undefined,
            done: c.path.length === 0 ? done : undefined,
            boundInputModel: modelSlice });

    }

    function loadPageForPath(elements?: PageElement[]) {
        pageContainer.removeAllChildren();
        const state = getStateForPath();
        if (!elements)
            elements = getElementsForPath();
        const p = page(elements, state);

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
                breadcrumbs.text = c.path.map(camelCaseToCapitalizedSpace).join(" > ");
        });
    breadcrumbs.tint = 0xbbbbbb;
    c.addChild(breadcrumbs, pageContainer);
    return c;
}
