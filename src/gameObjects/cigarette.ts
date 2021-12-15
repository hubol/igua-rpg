import {rng} from "../utils/rng";
import {Graphics} from "pixi.js";
import {now} from "../utils/now";

const filter = 0xEAA459;
const rest = 0xD7E3EA;
const smoke = 0x93989B;

export function cigarette(life = .5 + rng() * .5) {
    let update = 0;
    const gfx = new Graphics().withStep(() => {
        if (life <= 0)
            return gfx.y += 2;
        if (update++ % 2 !== 0)
            return;

        const buttEnd = 2 + 5 * life;
        gfx.clear();
        gfx
            .lineStyle(1, filter)
            .lineTo(2, 0)
            .lineStyle(1, rest)
            .lineTo(buttEnd, 0);

        const start = life > 0.1 ? 0 : (1 - (life / 0.1));

        gfx.lineStyle(1, smoke);
        let moved = false;
        for (let i = start; i < 1; i += 0.1) {
            const x = Math.min(1, i * 4) * Math.cos(life * 3 + now.s + i * 3 + 2) * Math.sin(life + now.s + i * 3) * 8 + buttEnd + 1 + Math.min(1, i * 8) * 9 + i * 4;
            const y = i * -32 + Math.abs(Math.cos(life * 2 + now.s * 1.2 + i) * Math.max(0, i - .3)) * -8 + 1;

            if (i > 0.75)
                gfx.lineStyle(3, smoke);
            else if (i > 0.5)
                gfx.lineStyle(2, smoke);

            if (!moved) {
                gfx.moveTo(x, y);
                moved = true;
            }
            else
                gfx.lineTo(x, y);
        }

        life -= 0.001;
    });
    return gfx;
}
