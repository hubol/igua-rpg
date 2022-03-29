import {Container, DisplayObject} from "pixi.js";
import {IguaText} from "../../text";
import {getLooksInputModel, Looks, LooksInputModel} from "../looksModel";
import {bindLooks} from "../bindLooks";
import {Page, PageElement, PageState} from "../../ui/page";
import {makeModelPageElements} from "./makeModelPageElements";
import {makeColorPageElements} from "./colorButton";
import {camelCaseToCapitalizedSpace} from "../../../utils/camelCaseToCapitalizedSpace";
import {makeIguanaPuppetArgsFromLooks} from "../makeIguanaPuppetArgsFromLooks";
import {iguanaPuppet} from "../../puppet/iguanaPuppet";
import {sleep} from "../../../cutscene/sleep";
import {ChangeLooks, LooksPageBack, LooksPageInto, SelectOption} from "../../../sounds";
import {pageRoot} from "../../ui/pageRoot";
import {scene} from "../../scene";
import {bigua} from "../../../gameObjects/bigua";

export let looksContext: LooksContext;

interface LooksContext {
    path: ReadonlyArray<string>;
    inputModel: LooksInputModel;
    back();
    into(page: string, elements?: PageElement[]);
    save();
    page: Page;
}

export function looksUiRoot(defaultLooks: Looks, save: (looks: Looks) => unknown) {
    const boundInputModel = getLooksInputModel();
    bindLooks(boundInputModel, defaultLooks);

    const path: string[] = [];

    const c = new Container();

    const root = pageRoot({ playSounds: false });

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
        save: () => save(defaultLooks),
        inputModel: boundInputModel,
        page: {} as any,
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
        const state = getStateForPath();
        if (!elements)
            elements = getElementsForPath();
        const selectedIndex = elements.findIndex(x => x.selected);
        if (selectedIndex >= 0)
            state.selectionIndex = selectedIndex;
        looksContext.page = root.goto(elements, state).at(3, 13);
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
    c.addChild(
        breadcrumbs,
        root,
        preview(defaultLooks, scene.ext.largeCharacterMode && previewBigua ),
    );

    return c;
}

function previewIguanaPuppet(looks: Looks) {
    const args = makeIguanaPuppetArgsFromLooks(looks);
    const puppet = iguanaPuppet(args);
    puppet.scale.set(3);
    return puppet.withAsync(async () => {
        while (true) {
            await sleep(2000);
            puppet.hspeed = puppet.engine.walkSpeed;
            await sleep(2000);
            puppet.hspeed = 0;
            await sleep(2000);
            puppet.isDucking = true;
            await sleep(2000);
            puppet.isDucking = false;
        }
    }).at(161, 160);
}

function previewBigua(looks: Looks) {
    const puppet = bigua(looks);
    return puppet.withAsync(async () => {
        while (true) {
            await sleep(2000);
            puppet.isDucking = true;
            await sleep(2000);
            puppet.isDucking = false;
        }
    }).at(161, 160);
}

function preview(looks: Looks, fn = previewIguanaPuppet) {
    const c = new Container();

    let unchangedSteps = 0;

    let lastLooksJson: string;
    let puppet: DisplayObject;
    let selectedIndex = 0;
    let lastPathLength = 1;

    c.withStep(() => {
        const nextPathLength = looksContext.path.length;
        justWentInto = nextPathLength > lastPathLength;
        justWentBack = nextPathLength < lastPathLength;
        lastPathLength = nextPathLength;

        const nextSelectedIndex = looksContext.page.state.selectionIndex;
        selectionJustChanged = nextSelectedIndex !== selectedIndex
            && (looksContext.path.length === 0 || !looksContext.path[looksContext.path.length - 1].includes('opy'));
        selectedIndex = nextSelectedIndex;

        const currentLooksJson = JSON.stringify(looks);
        looksJustChanged = currentLooksJson !== lastLooksJson;
        if (puppet && currentLooksJson === lastLooksJson) {
            unchangedSteps++;
            return;
        }

        unchangedSteps = 0;

        if (puppet)
            puppet.destroy();
        puppet = fn(looks);
        c.addChild(puppet);
        lastLooksJson = currentLooksJson;
    })
    .withStep(() => {
        if (unchangedSteps < 90)
            return;

        const b = c.getBounds();
        const marginLeft = Math.floor((157 - b.width) / 2);
        const left = 99 + marginLeft;
        const diff = b.x - left;
        const dx = Math.sign(diff) * Math.min(Math.abs(diff), 3);
        if (Math.abs(dx) > 1)
            c.x -= dx;
    })
    .withStep(() => {
        if (justWentInto) {
            LooksPageInto.play();
        }
        else if (justWentBack) {
            LooksPageBack.play();
        }
        else if (looksJustChanged) {
            ChangeLooks.play();
        }
        else if (selectionJustChanged) {
            SelectOption.play();
        }
    });

    let selectionJustChanged = false;
    let justWentBack = false;
    let justWentInto = false;
    let looksJustChanged = false;

    return c;
}
