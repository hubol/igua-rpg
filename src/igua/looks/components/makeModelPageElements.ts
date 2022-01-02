import {button} from "./button";
import {capitalizeFirstLetter} from "../../../utils/capitalizeFirstLetter";
import {PageElement} from "./page";
import {LooksInput} from "../looksModel";

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
        if ('kind' in value) {
            if (value.kind !== 'color')
                continue;
        }
        elements.push(button(capitalizeFirstLetter(key), () => into(key)));
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
