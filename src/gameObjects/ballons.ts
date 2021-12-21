import {Vector} from "../utils/math/vector";
import {Container, DisplayObject, Graphics, Sprite} from "pixi.js";
import {findStage} from "../igua/findStage";
import {rng} from "../utils/rng";
import {merge} from "../utils/merge";
import {PlayerBallonPop, PlayerBalloon} from "../textures";
import {doNowOrOnAdded} from "../utils/extensions/pixiExtensions";
import {trackPosition} from "../igua/trackPosition";
import {now} from "../utils/now";
import {container} from "../utils/pixi/container";
import {AsshatTicker} from "../utils/asshatTicker";
import {player} from "./player";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {smallPopTextures} from "./smallPop";

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
    ticker?: AsshatTicker;
}

const work: Vector = { x: 0, y: 0 };

const ballonPopTextures = subimageTextures(PlayerBallonPop, 4);

function ballonPop() {
    return smallPopTextures(ballonPopTextures);
}

function ballon(hacks) {
    const r = rng();
    const sprite = Sprite.from(PlayerBalloon);
    sprite.anchor.set(0.5, 1);

    const gfx = new Graphics().withStep(() => {
        if (hacks.dead) {
            const p = c.parent.addChild(ballonPop()).at(c);
            p.hueShift = c.hueShift;
            c.destroy();
        }
        if (!hacks.animate)
            return;
        sprite.y = Math.round(Math.sin(now.s * 2 + r) * 1.7);
        gfx.clear()
            .lineStyle(1, 0xaaaaaa)
            .moveTo(sprite.x, sprite.y)
            .lineTo(-c.x / 4, -c.y / 4 + 3)
            .lineTo(-c.x / 2, -c.y / 2 + 3)
            .lineTo(-c.x, -c.y);
        if (Math.abs(c.x) > 8)
            sprite.angle = (Math.abs(c.x) - 8) * Math.sign(c.x);
        else
            sprite.angle = 0;
    });

    const c = container(gfx, sprite);
    return c;
}

export function ballons({ target, offset, state, string, displayState = [], ticker }: Args) {
    const objs: ReturnType<typeof ballon>[] = [];

    const hacks = { animate: true, dead: false };
    const t = trackPosition(target);

    let allowedToAnimateWhenTargetTickerDisabled = false;

    const c = merge(new Container(), { displayState }).withStep(() => {
        hacks.dead = target.destroyed || (target === player && player.isDead);

        if (target.ticker.doNextUpdate)
            allowedToAnimateWhenTargetTickerDisabled = false;
        else if (state.length !== displayState.length)
            allowedToAnimateWhenTargetTickerDisabled = true;

        hacks.animate = target.ticker.doNextUpdate || allowedToAnimateWhenTargetTickerDisabled;

        if (!hacks.animate)
            return;

        // TODO support popping ballons
        while (displayState.length < state.length) {
            displayState.push({ color: rng() * 360, offset: [rng.polar * 2, 0] });
        }
        while (objs.length < displayState.length) {
            objs.push(c.addChild(ballon(hacks)));
        }
        for (let i = 0; i < displayState.length; i++) {
            const ii = displayState[i];
            if (ii.offset.vlength < string)
                ii.offset.y -= 1;
            if (i < 2 && Math.abs(ii.offset.x) > 10)
                ii.offset.x *= 0.95;

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

            const distance = ii.offset.vlength;
            let fix = 0;
            if (distance > string * 1.45)
                fix = 1.1;
            else if (distance > string * 1.3)
                fix = .7;
            else if (distance > string * 1.1)
                fix = .3;
            if (fix > 0)
                ii.offset.vlength -= fix;
            if (ii.offset.vlength > string * 0.7 && ii.offset.y > -10)
                ii.offset.y -= 1;
        }

        displayState!.forEach((x, i) => {
            objs[i].hueShift = x.color;
            const delta = 1 - (objs[i].vlength / string);
            objs[i].moveTowards(x.offset, Math.max(0.1, delta));
        });

        c.at(t.current).add(offset);
        if (((Math.abs(t.diff.x) < 0.1 && Math.abs(t.diff.y) < 0.1)))
            return;
        for (let i = 0; i < displayState.length; i++) {
            const dx = (Math.sign(objs[i].x) === Math.sign(t.diff.x) ? t.diff.x * 3 : t.diff.x) * -0.1;
            const dy = (Math.sign(objs[i].y) === Math.sign(t.diff.y) ? t.diff.y * 3 : t.diff.y) * -0.1;
            displayState[i].offset.x += dx;
            displayState[i].offset.y += dy;
            objs[i].x += dx;
            objs[i].y += dy;
        }
    });

    if (ticker)
        c.withTicker(ticker);

    doNowOrOnAdded(target, () => {
        const stage = findStage(target);
        stage.addChildAt(c, 0);
    });
}
