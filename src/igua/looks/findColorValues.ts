import {LooksInputModel} from "./looksModel";

export function findColorValues(input: LooksInputModel, result: number[] = []) {
    // @ts-ignore
    if (input?.kind === 'color') {
        // @ts-ignore
        result.push(input.value);
    }
    else if (typeof input === 'object') {
        const keys = Object.keys(input);
        keys.forEach(k => findColorValues(input[k], result));
    }

    return result;
}
