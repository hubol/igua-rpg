import {Graphics} from "pixi.js";
import {approachLinear, lerp} from "../utils/math/number";
import {vnew, lerp as lerpv} from "../utils/math/vector";

const def = [6, -54, 16, -48];
const back1 = [-16, -50, -42, -32];
const back2 = [-24, -44, -50, -25];
const cast0 = [22, -42, 16, -48];
const cast1 = [50, 4, 60, -12];
const cast2 = [24, -44, 50, -25];

// const animation = [ cast0 ];
const animation = [ def, back1, back2, cast0, cast1, cast2 ];

export function fishingPole() {
    let index = 0;
    let dindex = 0.05;

    const hook = [def[2], def[3]].vcpy();
    const dhook = vnew();

    const g = new Graphics()
        .withStep(() => {
            const [ cpx1, cpy1, tox1, toy1 ] = animation[Math.floor(index) % animation.length];
            const [ cpx2, cpy2, tox2, toy2 ] = animation[Math.floor(index + 1) % animation.length];

            const f = Math.floor((index % 1) * 3) / 3;
            const cpx = lerp(cpx1, cpx2, f);
            const cpy = lerp(cpy1, cpy2, f);
            const tox = lerp(tox1, tox2, f);
            const toy = lerp(toy1, toy2, f);

            const i = index % animation.length;
            if (i < 2) {
                if (i < 1) {
                    dhook.vlength *= 0.3;
                    lerpv(hook, [tox, toy], i);
                }
                else {
                    dhook.x -= 0.1;
                    dhook.y += 0.2;
                }
            }

            if (i >= 2.5 && i <= 3) {
                dhook.x += 2;
                dhook.y -= 2;
            }

            if (i >= 3) {
                dhook.x = approachLinear(dhook.x, 0, 1);
                dhook.y += 0.8;
            }

            hook.add(dhook);

            const v = [cpx, cpy].add(16, 12);
            v.vlength = 12;

            g.clear()
            .beginFill(0xE29623, 1)
            .drawCircle(v.x - 1, v.y - 1, 4)
            .endFill()
            .lineStyle(1, 0x0D1C7C)
            .quadraticCurveTo(cpx, cpy, tox, toy)
            .moveTo(1, 0)
            .quadraticCurveTo(cpx, cpy, tox, toy)
            .moveTo(2, 0)
            .quadraticCurveTo(cpx, cpy, tox, toy)
            .moveTo(1, 1)
            .quadraticCurveTo(cpx, cpy, tox, toy)
            .moveTo(0, 1)
            .quadraticCurveTo(cpx, cpy, tox, toy)
            .moveTo(0, 2)
            .quadraticCurveTo(cpx, cpy, tox, toy)
            .lineStyle(1, 0xf0f0f0)
            .moveTo(tox, toy)
            .lineTo(hook.x, hook.y)
            .lineStyle()
            .beginFill(0xF2A643, 1)
            .drawCircle(v.x, v.y, 4);

            index += dindex;
        });

    return g;
}