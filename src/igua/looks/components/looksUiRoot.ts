import {Container, DisplayObject} from "pixi.js";
import {IguaText} from "../../text";
import {getLooksInputModel, Looks, LooksInputModel} from "../looksModel";
import {bindLooks} from "../bindLooks";
import {Page, page, PageElement, PageState} from "./page";
import {makeModelPageElements} from "./makeModelPageElements";
import {makeColorPageElements} from "./colorButton";
import {camelCaseToCapitalizedSpace} from "../../../utils/camelCaseToCapitalizedSpace";
import {makeIguanaPuppetArgsFromLooks} from "../makeIguanaPuppetArgsFromLooks";
import {iguanaPuppet} from "../../puppet/iguanaPuppet";
import {playerPuppetArgs} from "../../../gameObjects/player";

export let looksContext: LooksContext;

interface LooksContext {
    path: ReadonlyArray<string>;
    inputModel: LooksInputModel;
    back();
    into(page: string, elements?: PageElement[]);
    save();
    page: Page;
}

export function looksUiRoot(defaultLooks: Looks) {
    const boundInputModel = getLooksInputModel();
    bindLooks(boundInputModel, defaultLooks);

    const path: string[] = [];

    const c = new Container();

    const pageContainer = new Container();

    function save() {
        // TODO
    }

    function back() {
        getStateForPath().selectionIndex = 0;
        path.pop();
        loadPageForPath();
    }

    function into(page: string, elements?: PageElement[]) {
        path.push(page);
        loadPageForPath(elements);
    }

    looksContext = {
        back,
        into,
        path,
        save,
        inputModel: boundInputModel,
        page: {} as any
    };

    const statesByPath = {};
    function getStateForPath(): PageState {
        const key = path.join('.');
        if (key in statesByPath)
            return statesByPath[key];
        return statesByPath[key] = { selectionIndex: 0 };
    }

    function getModelSliceForPath() {
        let model = boundInputModel;
        for (const key of path)
            model = model[key];
        return model as any;
    }

    function getElementsForPath() {
        const modelSlice = getModelSliceForPath();
        if (modelSlice.kind) {
            if (modelSlice.kind === 'color')
                return makeColorPageElements(modelSlice);
        }
        return makeModelPageElements(modelSlice);

    }

    function loadPageForPath(elements?: PageElement[]) {
        pageContainer.removeAllChildren();
        const state = getStateForPath();
        if (!elements)
            elements = getElementsForPath();
        const selectedIndex = elements.findIndex(x => x.selected);
        if (selectedIndex >= 0)
            state.selectionIndex = selectedIndex;
        const p = page(elements, state);
        looksContext.page = p;

        pageContainer.addChild(p.at(3, 13));
        for (let i = 0; i < 2; i++)
            pageContainer.ticker.update();
    }

    loadPageForPath();

    const breadcrumbs = IguaText.Large()
        .at(3, 0)
        .withStep(() => {
            if (path.length === 0)
                breadcrumbs.text = 'Choose your looks.';
            else
                breadcrumbs.text = path.map(camelCaseToCapitalizedSpace).join(" > ");
        });
    breadcrumbs.tint = 0xbbbbbb;
    c.addChild(breadcrumbs, pageContainer, preview(defaultLooks).at(160, 160));

    return c;
}

function preview(looks: Looks) {
    const c = new Container();
    const og = iguanaPuppet(playerPuppetArgs());
    og.alpha = 0.5;

    c.addChild(og);

    let lastLooksJson: string;
    let puppet: DisplayObject;
    c.withStep(() => {
        const currentLooksJson = JSON.stringify(looks);
        if (puppet && currentLooksJson === lastLooksJson)
            return;

        if (puppet)
            puppet.destroy();
        const args = makeIguanaPuppetArgsFromLooks(looks);
        puppet = iguanaPuppet(args);
        c.addChild(puppet);
        lastLooksJson = currentLooksJson;
    });

    return c;
}
