import {container} from "../utils/pixi/container";
import {sleep} from "../cutscene/sleep";
import {Graphics} from "pixi.js";
import {smallPop} from "./smallPop";
import {rng} from "../utils/rng";
import {rectangleCircleOverlap} from "../utils/math/rectangleCircleOverlap";
import {player} from "./player";

export function empBlast(radius: number, hintsCount: number, damage: number, hostileMs: number) {
    const c = container()
        .withAsync(async () => {
            const initialHintsCount = hintsCount;
            while (hintsCount > 0) {
                hintsCount--;
                c.addChild(hint(radius, hintsCount / initialHintsCount));
                await sleep(1000);
            }
            c.addChild(hostile(radius, damage));
            await sleep(hostileMs);
            c.destroy();
        });
    return c;
}

function hostile(radius: number, damage: number) {
    function pop() {
        smallPop(rng.bool ? 8 : 12)
            .at(rng.unitVector.scale(radius * rng()).add(g.parent));
    }

    const g = new Graphics()
        .withStep(() => {
            for (let i = 0; i < 3; i++)
                pop();
            const origin = g.getBounds();
            const x = origin.x + radius;
            const y = origin.y + radius;
            const p = player.getBounds();
            if (rectangleCircleOverlap(radius, x, y, p.x, p.y, p.x + p.width, p.y + p.height))
                player.damage(damage);
        });

    g.on('added', () => {
        for (let i = 0; i < 32; i++)
            pop();
    });

    g.beginFill(0xeeeeff)
        .drawCircle(0, 0, radius);

    return g;
}

function hint(radius: number, safe: number) {
    // TODO sfx
    let life = 45;
    const initialLife = life;
    const g = new Graphics()
        .withStep(() => {
            if (life-- <= 0)
                return g.destroy();
            const unit = life / initialLife;
            g.clear()
                .beginFill(0xA0BCE8, unit * Math.max(0.2, 1 - safe))
                .drawCircle(0, 0, radius * Math.min(1, 1.875 - unit));
        });
    return g;
}
