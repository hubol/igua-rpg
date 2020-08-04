import {sleep} from "./sleep";

export async function wait(predicate: () => boolean, intervalMs = 33)
{
    while (!predicate())
        await sleep(intervalMs);
}