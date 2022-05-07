/**
 * Accesses the given key on the object. If the key is present, its value is returned. Otherwise, a new object is
 * assigned to that key and the new object is returned.
 */
export function getOrEmpty(obj: Record<string, any>, key: string): Record<string, any> {
    if (obj[key])
        return obj[key];
    return obj[key] = {};
}