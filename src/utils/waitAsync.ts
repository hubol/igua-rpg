import {sleep} from "pissant";

export function waitAsync(predicate: () => Promise<boolean>, intervalMs: number) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            while (!await predicate())
                await sleep(intervalMs);
            resolve();
        }
        catch (e) {
            reject(e);
        }
    });
}
