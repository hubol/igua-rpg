import {Vector} from "../utils/math/vector";
import {game} from "./game";
import {areRectanglesOverlapping, normalizeRectangle, Rectangle, rectangleContainsVector} from "../utils/math/rectangle";

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