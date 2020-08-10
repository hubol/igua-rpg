export async function waitUntilTruthy<T>(supplier: () => T): Promise<T>
{
    let value;
    while (!(value = supplier()))
        await sleep(33);

    return value;
}

export function sleep(ms: number)
{
    return new Promise<void>(resolve => setTimeout(resolve, ms))
}