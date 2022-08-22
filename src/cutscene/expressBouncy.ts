import {Player} from "../gameObjects/player";
import {wait} from "./wait";
import {sleep} from "./sleep";

type BounceablePuppet = Pick<Player, 'engine' | 'vspeed'>;

export async function expressBouncy(p: BounceablePuppet, vspeed = -1, count = 4) {
    const promise = expressBouncyImpl(p, vspeed, count);
    return Promise.race([sleep(4000), promise]);
}

async function expressBouncyImpl(p: BounceablePuppet, vspeed: number, count: number) {
    for (let i = 0; i < count; i++) {
        p.vspeed = vspeed;
        await wait(() => p.vspeed >= 0);
        await wait(() => p.engine.isOnGround);
    }
}