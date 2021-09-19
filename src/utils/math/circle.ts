export function circle(x: number, y: number, initialRadius: number, count: number, deltaRadius = 0, totalRadians = Math.PI * 2) {
    return [...new Array(count)].map((_, i) => {
        const radians = totalRadians / count * i;
        const radius = initialRadius + deltaRadius * i;
        const xUnit = Math.cos(radians);
        const yUnit = -Math.sin(radians);
        return ({ x: x + xUnit * radius, y: y + yUnit * radius, xUnit, yUnit });
    });
}
