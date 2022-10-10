import {Sprite} from "pixi.js";
import {CapitalBubble} from "../textures";
import {resolveBlock} from "./walls";
import {progress} from "../igua/data/progress";
import {player} from "./player";
import {nlerp} from "../utils/math/number";
import {resolveGameObject} from "../igua/level/resolveGameObject";

export const resolveCapitalBubble = resolveGameObject('CapitalBubble', a => capitalBubble(a.obscurity).at(a));

function capitalBubble(obscurity: number) {
    const s = Sprite.from(CapitalBubble)
        .withAsync(async () => resolveBlock({ x: s.x, y: s.y + 10, width: 28, height: 7, visible: false } as any));

    if (obscurity > 0)
        s.withStep(() => {
            const max = player.engine.isOnGround && s.collides(player);
            const target = max ? alphaMax(obscurity) : alphaBase(obscurity);
            s.alpha = nlerp(s.alpha, target, 0.033);
        });

    return s;
}

function alphaBase(obscurity: number) {
    return obscurity > progress.levels.intelligence ? 0 : ((obscurity + 1) - progress.levels.intelligence) / 10;
}

function alphaMax(obscurity: number) {
    return Math.sign(alphaBase(obscurity));
}