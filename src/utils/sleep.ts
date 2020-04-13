export function sleep(ms: number)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function sleepUntilSync(targetTimeMilliseconds: number)
{
    const start = performance.now();
    while (performance.now() < start + targetTimeMilliseconds)
    {
        // nop
    }
}