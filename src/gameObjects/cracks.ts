import {makePseudo} from "../utils/math/makePseudo";
import {scene} from "../igua/scene";
import {Graphics} from "pixi.js";
import {distance, Vector, vnew} from "../utils/math/vector";
import {merge} from "../utils/object/merge";

export function cracks(seed: number, color: number, width = scene.width, height = scene.height) {
    const p = makePseudo(seed);
    const g = new Graphics().lineStyle(1, color);

    const maxLength = Math.min(128, Math.min(scene.height, scene.width) / 2) * 1.33;

    function branch(x, y, d: Vector, len: number) {
        g.moveTo(x, y).lineTo(x + d.x * len, y + d.y * len);
    }

    const roots = [] as (Vector & { d: Vector })[];
    const minRootDistance = maxLength / 2;
    const count = Math.ceil((Math.sqrt(width * height) / maxLength) * (1 + p.unit()) * 2);
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
            const r = merge(vnew().at(x, y), { d });
            d.normalize();
            if (roots.some(rr => distance(rr, r) < minRootDistance)) {
                retries++;
                continue;
            }
            roots.push(r);
        }
    }

    roots.forEach(x => branch(x.x, x.y, x.d, maxLength * (0.67 + 0.33 * p.unit())));

    return g;
}