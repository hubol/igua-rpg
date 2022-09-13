import {Graphics} from "pixi.js";
import {drawPool} from "./pool";
import {container} from "../utils/pixi/container";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {resolveBlock} from "./walls";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {VolcanoLavaBubble} from "../textures";
import {animatedSprite} from "../igua/animatedSprite";
import {makePseudo} from "../utils/math/makePseudo";
import { track } from "../igua/track";
import {scene} from "../igua/scene";

const f = (x: number) => Math.sin(x * 0.2 + scene.s + Math.sin(x)) * 2 - 1;

export const resolveLava = resolveGameObject('Lava', (e) => lavaImpl(e.width, e.height).at(e));

function lavaImpl(width: number, height: number) {
    const mask = lava(width, height);
    const g = new Graphics()
        .withStep(() => {
            g.clear().lineStyle(1, 0xECD51F).beginFill(0xDD4335);
            drawPool(g, width, height, f);
        })
    const c = container(mask, g)
        .on('added', () => {
            resolveBlock({ ...getWorldBounds(mask), width: mask.width, height: mask.height } as any);
        });

    const p = makePseudo(width * 1.33 + height * 1.12 + 69.9);
    const count = (width * height) / (48 * 30);
    const dy = 360 / width;

    for (let i = 0; i < count; i++) {
        const b = bubble().at(10 + p.int() % (width - 20), 4 + dy * i).show(c);
        b.scale.x = p.bool() ? 1 : -1;
        b.imageIndex = p.unit() * 5;
        b.imageSpeed = 0.02 + p.unit() * 0.02;
    }

    return c;
}

export const lava = track(lavaMaskImpl);

function lavaMaskImpl(width: number, height: number) {
    return new Graphics().drawRect(0, 0, width, height).hide();
}

const bubbleTxs = subimageTextures(VolcanoLavaBubble, 2);

function bubble() {
    return animatedSprite(bubbleTxs, 0).centerAnchor();
}