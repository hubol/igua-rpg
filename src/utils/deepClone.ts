import serializeJavascript from "serialize-javascript";

export function deepClone<T>(t: T): T
{
    return eval(`(${serializeJavascript(t)})`);
}