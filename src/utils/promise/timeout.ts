export function timeout(ms: number) {
    return new Promise<void>(r => setTimeout(r, ms));
}