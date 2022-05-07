import {timeout} from "./timeout";

export function timeoutWaitAsync(predicate: () => Promise<boolean>, intervalMs: number) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            while (!await predicate())
                await timeout(intervalMs);
            resolve();
        }
        catch (e) {
            reject(e);
        }
    });
}
