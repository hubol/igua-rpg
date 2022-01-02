import {button} from "./button";
import {PageElement} from "./page";
import {LooksInput} from "../looksModel";
import {colorButton} from "./colorButton";
import {camelCaseToCapitalizedSpace} from "../../../utils/camelCaseToCapitalizedSpace";

type BoundInput = { kind: LooksInput['kind'], value };
type BoundInputModel = Record<string, BoundInput | {}>;

type Args = {
    boundInputModel: BoundInputModel;
    back?();
    done?();
    into(page: string);
}

export function makeModelPageElements({ into, boundInputModel, back, done }: Args) {
    const elements: PageElement[] = [];
    for (const [key, value] of Object.entries(boundInputModel)) {
        const title = camelCaseToCapitalizedSpace(key);
        if ('kind' in value) {
            if (value.kind === 'color')
                elements.push(colorButton(title, () => into(key), value));
            continue;
        }
        elements.push(button(title, () => into(key)));
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
