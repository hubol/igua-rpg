import {rectangleCircleOverlap} from "../../utils/math/rectangleCircleOverlap";
import {Rectangle} from "../../utils/math/rectangle";
import {getWorldBounds} from "../gameplay/getCenter";
import {player} from "../../gameObjects/player";

export function playerCollidesCircle(wx: number, wy: number, radius: number) {
    if (!overlap(radius, wx, wy, getWorldBounds(player)))
        return false;
    for (const hurtbox of player.hurtboxes) {
        if (overlap(radius, wx, wy, getWorldBounds(hurtbox)))
            return true;
    }

    return false;
}

function overlap(radius, wx, wy, r: Rectangle) {
    return rectangleCircleOverlap(radius, wx, wy, r.x, r.y, r.x + r.width, r.y + r.height);
}