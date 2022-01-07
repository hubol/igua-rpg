import {ChoiceInput, ColorInput, LooksInput, LooksInputModel} from "./looksModel";

export function findColorValues(input: LooksInputModel) {
    return findColorInputs(input).map(x => x.value);
}

export function findColorInputs(input: LooksInputModel) {
    return findInputs(input, 'color') as (ColorInput & { value: number })[];
}

export function findChoiceInputs<T = unknown>(input: LooksInputModel) {
    return findInputs(input, 'choice') as (ChoiceInput<T> & { value: number })[];
}

export function findInputs(input: LooksInputModel, kind: LooksInput['kind'], result: any[] = []) {
    // @ts-ignore
    if (input?.kind === kind) {
        // @ts-ignore
        result.push(input);
    }
    else if (typeof input === 'object') {
        const keys = Object.keys(input);
        keys.forEach(k => findInputs(input[k], kind, result));
    }

    return result;
}
