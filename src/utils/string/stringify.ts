export function stringify(x) {
    if (typeof x === 'string')
        return x;
    try {
        if (x instanceof Error)
            return `${x.name}: ${x.message}`;
        if (Array.isArray(x))
            return JSON.stringify(x);
        if (typeof x === 'object') {
            const toString = x.toString();
            if (toString.toLowerCase().includes('object]'))
                return JSON.stringify(x);
        }
        return x.toString();
    }
    catch (e1) {
        try {
            return x.toString();
        }
        catch (e2) {
            return "<Unknown value>";
        }
    }
}
