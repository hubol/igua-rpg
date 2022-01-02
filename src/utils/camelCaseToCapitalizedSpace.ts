import {capitalizeFirstLetter} from "./capitalizeFirstLetter";

export function camelCaseToCapitalizedSpace(x: string) {
    const words = x.split(/(?=[A-Z])/)
    return capitalizeFirstLetter(words.join(' '));
}
