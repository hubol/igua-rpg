import {DisplayObject, Sprite} from "pixi.js";
import {FinalEmoWizardBall} from "../textures";
import {distance, Vector, vnew} from "../utils/math/vector";
import {approachLinear} from "../utils/math/number";
import {getWorldPos} from "../igua/gameplay/getCenter";
import {merge} from "../utils/object/merge";

export function emoWizardBall() {
    const speedPrev = vnew();
    const trackers: Tracker[] = [];

    function register(...args: Parameters<typeof trackPositionSpeed>) {
        trackers.push(trackPositionSpeed(...args));
    }

    const s = merge(Sprite.from(FinalEmoWizardBall), { register })
        .withStep(() => speedPrev.at(s.speed))
        .withGravityAndWallResist([2, -1], 6, 0.2)
        .withStep(() => {
            if (speedPrev.x !== 0 && s.speed.x === 0)
                s.speed.x = -speedPrev.x * 0.7;

            if (s.isOnGround) {
                if (speedPrev.y > 1) {
                    s.speed.y = -speedPrev.y * 0.7;
                }
                else {
                    s.speed.x = approachLinear(s.speed.x, 0, 0.1);
                }
            }

            for (const tracker of trackers) {
                if (distance(s, tracker.pos) > 12)
                    continue;

                const speedx = Math.sign(tracker.speed.x)
                if (speedx !== 0) {
                    s.speed.x += tracker.speed.x;
                    if (s.speed.y === 0)
                        s.speed.y = -2;
                }
                else
                    s.speed.x = Math.abs(s.speed.x) * Math.sign(s.x - tracker.pos.x);
            }
        });

    return s;
}

function trackPositionSpeed(d: DisplayObject, offset: Vector) {
    let ever = false;
    const state = { pos: vnew(), speed: vnew() };

    d.withStep(() => {
        const px = state.pos.x;
        const py = state.pos.y;
        state.pos.at(getWorldPos(d)).add(offset);
        if (!ever)
            return ever = true;
        state.speed.at(state.pos.x - px, state.pos.y - py);
    });

    return state;
}

type Tracker = ReturnType<typeof trackPositionSpeed>;