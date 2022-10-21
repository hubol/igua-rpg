import {DisplayObject, Sprite} from "pixi.js";
import {CapitalBubble} from "../textures";
import {resolveBlock} from "./walls";
import {progress} from "../igua/data/progress";
import {player} from "./player";
import {nlerp} from "../utils/math/number";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {rng} from "../utils/math/rng";
import {now} from "../utils/now";
import {track} from "../igua/track";
import {Undefined} from "../utils/types/undefined";

export const resolveCapitalBubble = resolveGameObject('CapitalBubble', a => capitalBubble(a.obscurity).at(a));

function capitalBubbleImpl(obscurity: number, createBlock = true) {
    const x = rng() * 4;
    const dx = (0.35 + rng() * 0.2) * 6;
    let dependent = Undefined<DisplayObject>();

    const s = Sprite.from(CapitalBubble)
        .centerAnchor()
        .withStep(() => {
            s.scale.x = 0.8 + Math.round(Math.sin(now.s * dx + x)) * 0.05;
            s.scale.y = 0.8 + Math.round(Math.cos(now.s * dx * 0.87 - x * 3)) * 0.1;
        })
        .withAsync(async () => {
            s.add(14, 14);
            if (createBlock)
                dependent = resolveBlock({x: s.x - 14, y: s.y + 10 - 14, width: 28, height: 7, visible: false} as any);
        })
        .on('removed', () => {
            if (!dependent?.destroyed)
                dependent?.destroy();
        });

    if (obscurity > 0)
        s.withStep(() => {
            const max = player.engine.isOnGround && s.collides(player);
            const target = max ? alphaMax(obscurity) : alphaBase(obscurity);
            s.alpha = nlerp(s.alpha, target, 0.033);
        });

    return s;
}

export const capitalBubble = track(capitalBubbleImpl);

function alphaBase(obscurity: number) {
    return obscurity > progress.levels.intelligence ? 0 : ((progress.levels.intelligence + 1) - obscurity) / 10;
}

function alphaMax(obscurity: number) {
    return Math.sign(alphaBase(obscurity));
}