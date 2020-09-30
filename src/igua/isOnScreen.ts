import {areRectanglesOverlapping, normalizeRectangle, Rectangle, rectangleContainsVector} from "../utils/math";
import {Vector} from "../utils/vector";
import {game} from "./game";

let tempRectangle = { } as Rectangle;

export function isOnScreen(obj: Vector | Rectangle)
{
    if ("width" in obj)
    {
        tempRectangle.x = obj.x;
        tempRectangle.y = obj.y;
        tempRectangle.width = obj.width;
        tempRectangle.height = obj.height;
        return areRectanglesOverlapping(game.camera, normalizeRectangle(tempRectangle));
    }
    return rectangleContainsVector(game.camera, obj);
}