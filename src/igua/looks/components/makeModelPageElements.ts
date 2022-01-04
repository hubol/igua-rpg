import {button} from "./button";
import {PageElement} from "./page";
import {LooksInput, ValueInput} from "../looksModel";
import {colorButton} from "./colorButton";
import {camelCaseToCapitalizedSpace} from "../../../utils/camelCaseToCapitalizedSpace";
import {valueSlider} from "./valueSlider";
import {looksContext} from "./looksUiRoot";
import {placementInput} from "./placementInput";

type BoundInput = { kind: LooksInput['kind'], value };
type BoundInputModel = Record<string, BoundInput | {}>;

export function makeModelPageElements(boundInputModel: BoundInputModel) {
    function makePageElement(key: string, value: BoundInput) {
        const title = camelCaseToCapitalizedSpace(key);
        switch (value.kind) {
            case "color":
                return colorButton(title, () => looksContext.into(key), value);
            case "choice":
                break;
            case "placement":
                return placementInput(title, value);
            case "value":
                return valueSlider(title, value as any as ValueInput, { get: () => value.value, set: x => value.value = x });
            case "boolean":
                break;
            default:
                return button(title, () => looksContext.into(key));
        }
    }

    const elements: PageElement[] = [];
    for (const [key, value] of Object.entries(boundInputModel)) {
        const element = makePageElement(key, value as any);
        if (element)
            elements.push(element);
    }

    if (looksContext.path.length > 0)
        elements.push(button('Back', looksContext.back));
    else
        elements.push(button('Done', looksContext.save));

    let y = 0;
    for (const e of elements) {
        if (e === elements[elements.length - 1])
            y += 15;
        e.y = y;
        y += Math.max(30, e.height) + 3;
    }

    return elements;
}
