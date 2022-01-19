import {IguaText} from "../igua/text";
import {colord} from "colord";
import {rng} from "../utils/rng";

export function excitement() {
    let life = 30;
    const t = IguaText.Large('!').withStep(() => {
        t.add(rng.polar, rng.polar);
        t.tint = colord({ h: life * 12, s: 50, v: 100 }).toPixi();
        if (life-- <= 0)
            t.destroy();
    });

    t.scale.set(2);
    // @ts-ignore
    t.anchor.set(0.5);

    return t;
}
