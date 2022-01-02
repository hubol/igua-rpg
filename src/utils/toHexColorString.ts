export function toHexColorString(x: number) {
    const hex = '000000' + x.toString(16);
    return '#' + hex.substr(hex.length - 6);
}
