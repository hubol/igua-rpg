import {DuckGiant} from "../textures";
import {Sprite} from "pixi.js";
import { wait } from "../cutscene/wait";
import {player} from "./player";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {container} from "../utils/pixi/container";
import {sleep} from "../cutscene/sleep";
import {merge} from "../utils/merge";
import {now} from "../utils/now";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {DuckQuack} from "../sounds";

const [tailTexture, neutralTexture, agapeTexture] = subimageTextures(DuckGiant, 3);

export function giantDuck() {
    let agape = false;
    let excited = false;
    let jump = 0;

    const body = Sprite.from(neutralTexture).withStep(() => {
        body.texture = agape ? agapeTexture : neutralTexture;
    });
    const tail = Sprite.from(tailTexture).withStep(() => {
        if (excited)
            tail.angle = Math.round(Math.sin(now.s * Math.PI * 8)) * 15;
        else
            tail.angle = 0;
    });

    tail.anchor.set(9/54, 39/48);

    const tc = container(tail);
    tc.pivot.set(-9, -39);

    const c = merge(container(tc, body), {
            aggressive: false,
            async quack() {
                jump = -2;
                agape = true;
                excited = true;
                DuckQuack.play();
                await sleep(500);
                agape = false;
                excited = false;
            },
            charge() {
                agape = true;
                excited = true;
            }
        })
        .withAsync(async () => {
            await wait(() => c.aggressive && Math.sign(player.x - c.x) === Math.sign(c.scale.x) && isOnScreen(c));
            await c.quack();
            await sleep(500);
            c.charge();
        })
        .withAsync(async () => {
            while (true) {
                if (excited) {
                    c.x -= 1;
                    await sleep(100);
                    c.x += 1;
                }
                await sleep(100);
            }
        })
        .withStep(() => {
            if (jump !== 0) {
                c.pivot.y -= Math.trunc(jump);
                if (c.pivot.y <= 48) {
                    c.pivot.y = 48;
                    jump = 0;
                }
                else
                    jump += 0.32;
            }
        });

    c.pivot.set(27, 48);

    return c;
}