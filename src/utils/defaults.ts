export function defaults(src, dst) {
    if (src.constructor !== Object || dst.constructor !== Object)
        return;

    for (const key of Object.keys(src)) {
        if (dst[key] != null) {
            defaults(src[key], dst[key]);
            continue;
        }
        dst[key] = src[key];
    }

    return dst;
}
