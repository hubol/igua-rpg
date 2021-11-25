import {Container, Sprite} from "pixi.js";
import {ConfettiPiece} from "../textures";
import {now} from "../utils/now";
import {sleep} from "../cutscene/sleep";
import {smallPop} from "./smallPop";

const colors = [0xF37775, 0xFAE38F, 0x73BCF5];

function randomNegHalfToHalf(x) {
    return Math.random() * x - x / 2;
}

export function confetti(count = 16, radius = 32) {
    const c = new Container()
        .withAsync(async () => {
            for (let i = 0; i < 4; i++) {
                smallPop(8, c).at(randomNegHalfToHalf(radius), randomNegHalfToHalf(radius));
                await sleep(1000 / 15);
            }
        });
    for (let i = 0; i < count; i++) {
        const x = randomNegHalfToHalf(radius * 0.7);
        const hsp = Math.sign(x) * (0.2 + Math.random() * 0.4 + radius / 500);
        c.addChild(confettiPiece(hsp).at(x, randomNegHalfToHalf(radius)))
    }
    return c;
}

export function confettiPiece(hsp) {
    const d = Math.floor(Math.random() * 4)
    const e = Math.random() * 2 * Math.PI;
    const f1 = Math.random() > 0.5 ? 1 : -1;
    const f2 = Math.random() > 0.5 ? 1 : -1;
    let xScale = 1;
    let yScale = 1;
    let vsp = -Math.random() * 1.6 - 0.6;
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
    s.tint = colors[Math.floor(Math.random() * colors.length)];
    return s;
}
