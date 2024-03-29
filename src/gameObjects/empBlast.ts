import {container} from "../utils/pixi/container";
import {sleep} from "../cutscene/sleep";
import {Graphics} from "pixi.js";
import {smallPop} from "./smallPop";
import {rng} from "../utils/math/rng";
import {rectangleCircleOverlap} from "../utils/math/rectangleCircleOverlap";
import {player} from "./player";
import {EmpPulse, EmpPulseFinal, EmpPulseFire} from "../sounds";
import {merge} from "../utils/object/merge";

export function empBlast(radius: number, hintsCount: number, damage: number, hostileMs: number, hintMs = 1000, hintShowFrames = 45) {
    const c = merge(container(), { wentHostile: false })
        .withAsync(async () => {
            const initialHintsCount = hintsCount;
            while (hintsCount > 0) {
                hintsCount--;
                c.addChild(hint(radius, hintsCount / initialHintsCount, hintShowFrames));
                await sleep(hintMs);
            }
            c.addChild(hostile(radius, damage));
            c.wentHostile = true;
            await sleep(hostileMs);
            c.destroy();
        });
    return c;
}

function hostile(radius: number, damage: number) {
    EmpPulseFire.play();
    function pop() {
        smallPop(rng.bool ? 8 : 12)
            .at(rng.unitVector.scale(radius * rng()).add(g.parent));
    }

    let inactive = 2;

    const g = new Graphics()
        .withStep(() => {
            for (let i = 0; i < 3; i++)
                pop();
            const origin = g.getBounds();
            const x = origin.x + radius;
            const y = origin.y + radius;
            const p = player.getBounds();
            if (inactive-- <= 0 && rectangleCircleOverlap(radius - 8, x, y, p.x, p.y, p.x + p.width, p.y + p.height))
                g.damagePlayer(damage);
        });

    g.on('added', () => {
        for (let i = 0; i < 32; i++)
            pop();
    });

    g.beginFill(0xeeeeff)
        .drawCircle(0, 0, radius);

    return g;
}

function hint(radius: number, safe: number, initialLife = 45) {
    const isFinal = safe < 0.01;

    const pulse = EmpPulse.play();
    EmpPulse.rate(2 - safe, pulse);
    if (isFinal)
        EmpPulseFinal.play();

    let life = initialLife;
    const g = new Graphics()
        .withStep(() => {
            if (life-- <= 0)
                return g.destroy();
            const unit = life / initialLife;
            let alpha = Math.min(1, unit * 4) * Math.max(0.2, 1 - safe);
            if (isFinal && life % 16 < 8)
                alpha *= 0.9;
            g.clear()
                .beginFill(0xA0BCE8, alpha)
                .drawCircle(0, 0, radius * Math.min(1, 1.875 - unit));
        });
    return g;
}
