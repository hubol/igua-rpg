import {ColorInput, LooksInputModel} from "./looksModel";

export function findColorValues(input: LooksInputModel) {
    return findColorInputs(input).map(x => x.value);
}

export function findColorInputs(input: LooksInputModel, result: (ColorInput & { value: number })[] = []) {
    // @ts-ignore
    if (input?.kind === 'color') {
        // @ts-ignore
        result.push(input);
    }
    else if (typeof input === 'object') {
        const keys = Object.keys(input);
        keys.forEach(k => findColorInputs(input[k], result));
    }

    return result;
}
