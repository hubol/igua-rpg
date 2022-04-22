export function getOrEmpty(obj: Record<string, any>, key: string): Record<string, any> {
    if (obj[key])
        return obj[key];
    return obj[key] = {};
}