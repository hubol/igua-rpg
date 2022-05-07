import {Container, Sprite} from "pixi.js";
import {ConfettiPiece} from "../textures";
import {now} from "../utils/now";
import {sleep} from "../cutscene/sleep";
import {smallPop} from "./smallPop";
import {rng} from "../utils/math/rng";

const colors = [0xF37775, 0xFAE38F, 0x73BCF5];

export function confetti(count = 16, radius = 32) {
    const c = new Container()
        .withAsync(async () => {
            for (let i = 0; i < 4; i++) {
                smallPop(8, c).at(rng.polarHalf * radius, rng.polarHalf * radius);
                await sleep(1000 / 15);
            }
        });
    for (let i = 0; i < count; i++) {
        const x = rng.polarHalf * radius * 0.7;
        const hsp = Math.sign(x) * (0.2 + rng() * 0.4 + radius / 500);
        c.addChild(confettiPiece(hsp).at(x, rng.polarHalf * radius))
    }
    return c;
}

export function confettiPiece(hsp) {
    const d = rng.int(4);
    const e = rng() * 2 * Math.PI;
    const f1 = rng.bool ? 1 : -1;
    const f2 = rng.bool ? 1 : -1;
    let xScale = 1;
    let yScale = 1;
    let vsp = -rng() * 1.6 - 0.6;
    const s = new Sprite(ConfettiPiece).withStep(() => {
        if (d === 0)
            s.skew.x = Math.sin(e + now.s) * f1;
        else if (d === 1)
            s.skew.y = Math.sin(e + now.s) * f1;
        else if (d === 2)
            xScale = Math.sin(e + now.s) * f1;
        else if (d === 3)
            yScale = Math.sin(e + now.s) * f1;
        s.scale.set(xScale / 2, yScale / 4);
        s.angle += 1 * f2;
        hsp *= 0.975;
        s.x += hsp;
        if (vsp < 1.5)
            vsp += 0.06;
        s.y += vsp;
        if (s.y >= 512)
            s.destroy();
    });
    s.anchor.set(0.5, 0.5);
    s.tint = rng.choose(colors);
    return s;
}
