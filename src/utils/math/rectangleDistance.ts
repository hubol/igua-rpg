import {Rectangle} from "./rectangle";
import {DisplayObject, Rectangle as PixiRectangle} from "pixi.js";

const c1 = [].vcpy();
const c2 = [].vcpy();

const e1 = [].vcpy();
const e2 = [].vcpy();

const r = [].vcpy();

const pr1 = new PixiRectangle();
const pr2 = new PixiRectangle();

export function rectangleDistance(r1: Rectangle | DisplayObject, r2: Rectangle | DisplayObject) {
    if (r1 instanceof DisplayObject)
        r1 = r1.getBounds(false, pr1);
    if (r2 instanceof DisplayObject)
        r2 = r2.getBounds(false, pr2);
    e1.at(r1.width / 2, r1.height / 2);
    e2.at(r2.width / 2, r2.height / 2);
    c1.at(r1).add(e1);
    c2.at(r2).add(e2);
    r.at(c1).add(c2, -1);
    if (r.x < 0)
        r.x *= -1;
    if (r.y < 0)
        r.y *= -1;
    r.add(e1, -1).add(e2, -1);
    if (r.x < 0)
        r.x = 0;
    if (r.y < 0)
        r.y = 0;
    return r.vlength;
}