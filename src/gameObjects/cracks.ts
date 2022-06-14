import {makePseudo} from "../utils/math/makePseudo";
import {scene} from "../igua/scene";
import {Graphics} from "pixi.js";
import {distance, Vector, vnew} from "../utils/math/vector";
import {Force} from "../utils/types/force";

export function cracks(seed: number, color: number, width = scene.width, height = scene.height) {
    const p = makePseudo(seed);
    const g = new Graphics().lineStyle(1, color);

    const maxLength = Math.min(128, Math.min(scene.height, scene.width) / 2) * 1.33;

    const steps = 6;
    function branch(x, y, d: Vector, len: number) {
        if (len < 1)
            return;
        g.moveTo(Math.round(x), Math.round(y));
        let next = Math.min(16, len * (0.3 + p.unit() * 0.4))
        let dnext = len * (0.7 + p.unit() * 0.7) + 64 / len;
        while (len > 0) {
            if (next <= 0 && len > 2) {
                const d2 = d.vcpy();
                if (Math.abs(d2.x) > Math.abs(d2.y))
                    d2.y *= -(1 + p.unit() * 0.25);
                else
                    d2.x *= -(1 + p.unit() * 0.25);

                d2.x += p.polar() * 0.33;
                d2.y += p.polar() * 0.33;

                d2.normalize();

                const len2 = Math.max(4, len * (p.unit() + 0.2));

                if (len2 > 6)
                    branches.push([ x, y, d2, len2 ]);
                next += dnext;
            }
            x += d.x * steps;
            y += d.y * steps;
            g.lineTo(Math.round(x), Math.round(y));
            d.x += p.polar() * 0.67;
            d.y += p.polar() * 0.67;
            d.normalize();
            len -= steps;
            next -= steps;
        }
    }

    type BranchDef = Parameters<typeof branch>;
    const branches = [] as BranchDef[];

    const minRootDistance = maxLength;
    const count = Math.ceil((Math.sqrt(width * height) / maxLength) * (1 + p.unit()) * 4.67);
    for (let i = 0; i < count; i++) {
        let retries = 0;
        while (retries < 2) {
            const rs = p.unit() * 4;
            const s = Math.floor(rs);
            let x = 0;
            let y = 0;
            const d = vnew();
            switch (s) {
                case 0:
                    x = 0;
                    y = rs % 1;
                    d.at(1, p.polar());
                    break;
                case 1:
                    x = 1;
                    y = rs % 1;
                    d.at(-1, p.polar());
                    break;
                case 2:
                    x = rs % 1;
                    y = 0;
                    d.at(p.polar(), 1);
                    break;
                case 3:
                    x = rs % 1;
                    y = 1;
                    d.at(p.polar(), -1);
                    break;
            }
            x *= width;
            y *= height;
            const r = vnew().at(x, y);
            d.normalize();
            if (branches.some(rr => distance(rr, r) < minRootDistance)) {
                retries++;
                continue;
            }
            branches.push([ x, y, d, maxLength * (0.67 + 0.33 * p.unit()) ]);
        }
    }

    let next = Force<BranchDef>();
    while (next = branches.pop()!) {
        branch(...next);
    }

    g.cacheAsBitmap = true;

    return g;
}