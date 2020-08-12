import {sleep} from "pissant";

export async function waitUntilTruthy<T>(supplier: () => T): Promise<T>
{
    let value;
    while (!(value = supplier()))
        await sleep(33);

    return value;
}