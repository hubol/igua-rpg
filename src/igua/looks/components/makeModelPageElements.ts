import {button} from "./button";
import {PageElement} from "./page";
import {LooksInput, ValueInput} from "../looksModel";
import {colorButton} from "./colorButton";
import {camelCaseToCapitalizedSpace} from "../../../utils/camelCaseToCapitalizedSpace";
import {valueSlider} from "./valueSlider";

type BoundInput = { kind: LooksInput['kind'], value };
type BoundInputModel = Record<string, BoundInput | {}>;

type Args = {
    boundInputModel: BoundInputModel;
    back?();
    done?();
    into(page: string);
}

export function makeModelPageElements({ into, boundInputModel, back, done }: Args) {
    function makePageElement(key: string, value: BoundInput) {
        const title = camelCaseToCapitalizedSpace(key);
        switch (value.kind) {
            case "color":
                return colorButton(title, () => into(key), value);
            case "choice":
                break;
            case "placement":
                break;
            case "value":
                return valueSlider(title, value as any as ValueInput, { get: () => value.value, set: x => value.value = x });
            case "boolean":
                break;
            default:
                return button(title, () => into(key));
        }
    }

    const elements: PageElement[] = [];
    for (const [key, value] of Object.entries(boundInputModel)) {
        const element = makePageElement(key, value as any);
        if (element)
            elements.push(element);
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

    return elements;
}
