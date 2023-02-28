import {Pixin} from "../utils/pixi/pixin";
import {Vector, vnew} from "../utils/math/vector";
import {rayIntersectsWallDistance} from "../igua/logic/rayIntersectsWall";
import {merge} from "../utils/object/merge";
import {player} from "../gameObjects/player";

const unitv = {
    left: vnew().at(-1, 0),
    right: vnew().at(1, 0),
}

function freeSpaceOn(src: Vector, offsets: Vector[], unit: Vector) {
    return Math.min(
        ...offsets.map(offset => rayIntersectsWallDistance(v.at(src).add(offset), unit)));
}

const v = vnew();

export const FreeSpace = Pixin({ offsets: <Vector[]>[] })
    .applies((src) => {
        function freeSpaceOnLeft() {
            return freeSpaceOn(src, src.offsets, unitv.left);
        }

        function freeSpaceOnRight() {
            return freeSpaceOn(src, src.offsets, unitv.right);
        }

        function freeSpaceTowardsPlayer() {
            return player.x > src.x ? freeSpaceOnRight() : freeSpaceOnLeft();
        }

        function freeSpaceMin() {
            return Math.min(freeSpaceOnLeft(), freeSpaceOnRight());
        }

        return merge(src, { freeSpaceOnLeft, freeSpaceOnRight, freeSpaceTowardsPlayer, freeSpaceMin });
    });