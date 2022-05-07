import {Looks, LooksInputModel} from "./looksModel";
import {merge} from "../../utils/object/merge";

export function bindLooks(input: LooksInputModel, looks: Looks, head: string[] = []) {
    if ("kind" in input) {
        merge(input, getSet(looks, head));
    }
    else if (typeof input === 'object') {
        const keys = Object.keys(input);
        keys.forEach(k => bindLooks(input[k], looks, [...head, k]));
    }
}

function getPreTail(dst, head: string[]) {
    for (let i = 0; i < head.length - 1; i++)
        dst = dst[head[i]];
    return dst;
}

function getSet(dst, head: string[]) {
    const tail = head[head.length - 1];
    return {
        get value() {
            return getPreTail(dst, head)[tail];
        },
        set value(v) {
            getPreTail(dst, head)[tail] = v;
        },
    };
}
