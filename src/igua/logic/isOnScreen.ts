import {Vector} from "../../utils/math/vector";
import {areRectanglesOverlapping, normalizeRectangle, Rectangle as PrimRectangle, rectangleContainsVector} from "../../utils/math/rectangle";
import {scene} from "../scene";
import {DisplayObject, Rectangle} from "pixi.js";

let tempRectangle = { } as PrimRectangle;

const viewportRectangle = { x: 0, y: 0, width: 256, height: 256 };
const pixiRectangle = new Rectangle();

export function isOnScreen(obj: Vector | PrimRectangle)
{
    if (obj instanceof DisplayObject)
        return areRectanglesOverlapping(viewportRectangle, obj.getBounds(false, pixiRectangle));
    if ("width" in obj) {
        tempRectangle.x = obj.x;
        tempRectangle.y = obj.y;
        tempRectangle.width = obj.width;
        tempRectangle.height = obj.height;
        return areRectanglesOverlapping(scene.camera, normalizeRectangle(tempRectangle));
    }
    return rectangleContainsVector(scene.camera, obj);
}