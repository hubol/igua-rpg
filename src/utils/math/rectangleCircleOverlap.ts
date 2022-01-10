// https://www.geeksforgeeks.org/check-if-any-point-overlaps-the-given-circle-and-rectangle/
export function rectangleCircleOverlap(
    R: number, Xc: number, Yc: number,
    X1: number, Y1: number,
    X2: number, Y2: number)
{

    // Find the nearest point on the
    // rectangle to the center of
    // the circle
    const Xn = Math.max(X1, Math.min(Xc, X2));
    const Yn = Math.max(Y1, Math.min(Yc, Y2));

    // Find the distance between the
    // nearest point and the center
    // of the circle
    // Distance between 2 points,
    // (x1, y1) & (x2, y2) in
    // 2D Euclidean space is
    // ((x1-x2)**2 + (y1-y2)**2)**0.5
    const Dx = Xn - Xc;
    const Dy = Yn - Yc;
    return (Dx * Dx + Dy * Dy) <= R * R;
}
