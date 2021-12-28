// https://stackoverflow.com/a/39209226
export function mapObject(obj, fn) {
    return Object.keys(obj).reduce(
        (res, key) => {
            res[key] = fn(obj[key]);
            return res;
        },
        {}
    )
}
