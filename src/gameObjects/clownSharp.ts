import {SharpClownHead} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {hat} from "./hat";
import {merge} from "../utils/object/merge";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";
import {lerp} from "../cutscene/lerp";
import { lerp as nlerp } from "../utils/math/number";
import {getOffsetFromPlayer} from "../igua/logic/getOffsetFromPlayer";

export function clownSharp() {
    const automation = {
        facePlayer: true,
        lookAtPlayer: true,
    };
    const head = newHead()
        .withStep(() => {
            const ox = getOffsetFromPlayer(head).normalize().x;
            if (automation.lookAtPlayer)
                head.looking = Math.abs(ox) > 0.3 ? Math.sign(ox) : 0;
            if (automation.facePlayer && ox !== 0)
                head.facing = Math.sign(ox);
        });
    const c = container(head);
    return c;
}

function newHead() {
    const c = merge(container(), { facing: 1, looking: 0, breeze: 0, angry: false, shouting: false, blinkUnit: 0 } )
        .withAsync(async () => {
            await sleep(500 + rng.int(500));
            while (true) {
                await lerp(c, 'blinkUnit').to(1).over(100);
                await sleep(60);
                await lerp(c, 'blinkUnit').to(0).over(100);
                await sleep(300 + rng.int(3000));
            }
        });

    const mullet = Sprite.from(headTxs[HeadFrame.Mullet]);
    const head = Sprite.from(headTxs[HeadFrame.Head]);
    const mouth = Sprite.from(headTxs[HeadFrame.Mouth]);
    const hair = Sprite.from(headTxs[HeadFrame.Hair]);
    const eyes = Sprite.from(headTxs[HeadFrame.EyeDefault]).show(c);
    const eyelids = Sprite.from(headTxs[HeadFrame.EyelidsOpen]).show(c);
    const nose = Sprite.from(headTxs[HeadFrame.Nose]);

    const headAndHair = container(mullet, head, hair).show(c, 0);
    const face = container(mouth, nose).show(c);
    face.pivot.x = 17;
    face.x = face.pivot.x;

    hat(Sprite.from(headTxs[HeadFrame.Hat])).show(c);

    c.withStep(() => {
        face.scale.x = Math.sign(c.facing) || 1;
        headAndHair.scale.x = face.scale.x;
        headAndHair.x = Math.sign(headAndHair.scale.x - 1) * -33;
        hair.texture = headTxs[HeadFrame.Hair + Math.sign(Math.round(c.breeze) * c.facing) + 1];
        if (c.angry)
            eyes.texture = headTxs[HeadFrame.EyeAngry];
        else
            eyes.texture = headTxs[HeadFrame.EyeDefault + Math.sign(c.looking) + 1];
        mouth.texture = headTxs[HeadFrame.Mouth + (c.shouting ? 1 : 0)];
        eyelids.texture = headTxs[Math.floor(nlerp(HeadFrame.EyelidsOpen, HeadFrame.EyelidsClosed, c.blinkUnit))];
    });

    return c;
}

const headTxs = subimageTextures(SharpClownHead, { width: 30 });

enum HeadFrame {
    Mullet = 0,
    Head = 1,
    Mouth = 2,
    Hair = 4,
    EyeAngry = 7,
    EyeDefault = 8,
    EyelidsOpen = 11,
    EyelidsClosed = 15,
    Nose = 16,
    Hat = 17,
}