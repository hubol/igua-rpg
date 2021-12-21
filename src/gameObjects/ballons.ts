import {lerp, Vector} from "../utils/math/vector";
import {Container, DisplayObject, Graphics, Sprite} from "pixi.js";
import {findStage} from "../igua/findStage";
import {rng} from "../utils/rng";
import {merge} from "../utils/merge";
import {PlayerBalloon} from "../textures";
import {doNowOrOnAdded} from "../utils/extensions/pixiExtensions";
import {trackPosition} from "../igua/trackPosition";
import {now} from "../utils/now";
import {container} from "../utils/pixi/container";

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
    const r = rng();
    const sprite = Sprite.from(PlayerBalloon);
    sprite.anchor.set(0.5, 1);
    const gfx = new Graphics().withStep(() => {
        sprite.y = Math.round(Math.sin(now.s * 2 + r) * 1.7);
        gfx.clear()
            .lineStyle(1, 0xaaaaaa)
            .moveTo(sprite.x, sprite.y)
            .lineTo(-c.x, -c.y);
        if (Math.abs(c.x) > 8)
            sprite.angle = (Math.abs(c.x) - 8) * Math.sign(c.x);
        else
            sprite.angle = 0;
    });

    const c = container(gfx, sprite);
    return c;
}

export function ballons({ target, offset, state, string, displayState = [] }: Args) {
    const objs: ReturnType<typeof ballon>[] = [];

    const t = trackPosition(target);

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

            const nudgeF = Math.abs(Math.sin(now.s * 3 + i * 2));
            const nudgeCheck = nudgeF * 14;
            const nudgeBy = nudgeF * 0.1;

            for (let j = 0; j < displayState.length; j++) {
                if (j === i)
                    continue;
                const jj = displayState[j];

                work.at(ii.offset).add(jj.offset, -1);

                if (work.vlength < nudgeCheck) {
                    ii.offset.add(work, nudgeBy);
                    jj.offset.add(work, -nudgeBy);
                }
            }

            if (ii.offset.vlength > string * 1.1)
                ii.offset.vlength -= .3;
            if (ii.offset.vlength > string * 0.7 && ii.offset.y > -10)
                ii.offset.y -= 1;
        }

        displayState!.forEach((x, i) => {
            objs[i].shiftHue(x.color);
            const delta = 1 - (objs[i].vlength / string);
            objs[i].moveTowards(x.offset, Math.max(0.1, delta));
        });

        c.at(t.current).add(offset);
        if (Math.abs(t.diff.x) < 0.1 && Math.abs(t.diff.y) < 0.1)
            return;
        for (let i = 0; i < displayState.length; i++) {
            displayState[i].offset.add(t.diff, -0.1);
            objs[i]?.add(t.diff, -0.1);
        }
    });

    doNowOrOnAdded(target, () => {
        const stage = findStage(target);
        stage.addChildAt(c, 0);
    });
}
