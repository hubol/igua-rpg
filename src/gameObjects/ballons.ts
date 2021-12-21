import {Vector} from "../utils/math/vector";
import {Container, DisplayObject, Sprite} from "pixi.js";
import {findStage} from "../igua/findStage";
import {rng} from "../utils/rng";
import {merge} from "../utils/merge";
import {PlayerBalloon} from "../textures";
import {doNowOrOnAdded} from "../utils/extensions/pixiExtensions";

interface BallonDisplayState {
    color: number;
    offset: Vector;
}
type DisplayState = BallonDisplayState[];

interface Args {
    target: DisplayObject;
    state: number[];
    offset: Vector;
    string: number;
    displayState?: DisplayState;
}

const work: Vector = { x: 0, y: 0 };

function ballon() {
    const sprite = Sprite.from(PlayerBalloon);
    sprite.anchor.set(0.5, 0.75);
    return sprite;
}

export function ballons({ target, offset, state, string, displayState = [] }: Args) {
    const objs: ReturnType<typeof ballon>[] = [];
    const c = merge(new Container(), { displayState }).withStep(() => {
        // TODO support popping ballons
        while (displayState.length < state.length) {
            displayState.push({ color: rng() * 360, offset: [rng.polar * 2, 0] });
        }
        while (objs.length < displayState.length) {
            objs.push(c.addChild(ballon()));
        }
        for (let i = 0; i < displayState.length; i++) {
            const ii = displayState[i];
            if (ii.offset.vlength < string)
                ii.offset.y -= 1;

            for (let j = 0; j < displayState.length; j++) {
                if (j === i)
                    continue;
                const jj = displayState[j];

                work.at(ii.offset).add(jj.offset, -1);

                if (work.vlength < 14) {
                    ii.offset.add(work, 0.1);
                    jj.offset.add(work, -0.1);
                }
            }

            if (ii.offset.vlength > string * 1.1)
                ii.offset.vlength -= .1;
        }

        displayState!.forEach((x, i) => {
            objs[i].shiftHue(x.color);
            objs[i].x = x.offset.x;
            objs[i].y = x.offset.y;
        })
    });

    doNowOrOnAdded(target, () => {
        const stage = findStage(target);
        stage.addChildAt(c, 0);
    });

    // TODO possibly nudge ballons
    target.transform.onPositionChanged(() => c.at(offset).add(target));
}
