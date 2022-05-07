export function truncate(string, length) {
    if (string.length > length)
        return string.slice(0, length - 3) + "...";
    return string;
}
