import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {DassmannHead} from "../textures";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {Blinking} from "../pixins/blinking";
import {Graphics, Sprite} from "pixi.js";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {approachLinear} from "../utils/math/number";
import {now} from "../utils/now";

export function dassmann() {
    const head = mkHead()
        .withStep(() => {
            head.look = Math.sin(now.s * Math.PI);
            head.face = Math.sin(now.s * Math.PI + 1);
        });
    return head;
}

function mkHead() {
    const c = merge(container(), {
            look: 0,
            face: 0,
            agape: 0,
            antennar: 0,
            antennal: 0,
        })
        .withPixin(Blinking());

    Sprite.from(headTxs[HeadTx.Noggin]).show(c);

    const face = container().show(c);

    const mouth = Sprite.from(headTxs[HeadTx.Mouth]).show(face);

    const eyes = container().show(face).filter(alphaMaskFilter(Sprite.from(headTxs[HeadTx.Eyes]).show(face)));
    Sprite.from(headTxs[HeadTx.Eyes]).show(eyes);
    const pupils = Sprite.from(headTxs[HeadTx.Pupils]).show(eyes);
    const eyelids = new Graphics().beginFill(0xF0B020).drawRect(6, 7 - 8, 13, 8).show(eyes);

    Sprite.from(headTxs[HeadTx.Shield]).show(c);

    c.withStep(() => {
        pupils.x = approachLinear(pupils.x, Math.sign(c.look), 0.1);
        const len = HeadTx.MouthOpen2 - HeadTx.Mouth;
        const index = Math.floor(HeadTx.Mouth + len * Math.max(0, Math.min(1, c.agape)));
        mouth.texture =  headTxs[index];
        face.x = approachLinear(face.x, Math.sign(c.face), 0.1);
        eyelids.y = c.blink * 8;
    })

    return c;
}

const headTxs = subimageTextures(DassmannHead, { width: 26 });

enum HeadTx {
    Noggin = 0,
    Mouth,
    MouthOpen0,
    MouthOpen1,
    MouthOpen2,
    Eyes,
    Pupils,
    Shield
}