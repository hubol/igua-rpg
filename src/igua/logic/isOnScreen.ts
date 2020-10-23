import {Vector} from "../../utils/math/vector";
import {areRectanglesOverlapping, normalizeRectangle, Rectangle, rectangleContainsVector} from "../../utils/math/rectangle";
import {scene} from "../scene";

let tempRectangle = { } as Rectangle;

export function isOnScreen(obj: Vector | Rectangle)
{
    if ("width" in obj)
    {
        tempRectangle.x = obj.x;
        tempRectangle.y = obj.y;
        tempRectangle.width = obj.width;
        tempRectangle.height = obj.height;
        return areRectanglesOverlapping(scene.camera, normalizeRectangle(tempRectangle));
    }
    return rectangleContainsVector(scene.camera, obj);
}