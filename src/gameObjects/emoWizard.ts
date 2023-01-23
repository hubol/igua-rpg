import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {FinalEmoWizardBody} from "../textures";
import {Graphics, Sprite, Texture, TilingSprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {getWorldBounds, getWorldCenter} from "../igua/gameplay/getCenter";
import {scene} from "../igua/scene";

const bodyTxs = subimageTextures(FinalEmoWizardBody, 6);

export function emoWizard() {
    const c = container(dress(), head());
    c.pivot.set(16, 36);
    return c;
}

function dress() {
    const c = container();
    const s = Sprite.from(bodyTxs[2]).show(c).at(16, 36);
    s.anchor.set(0.5, 1);
    const arms = Sprite.from(bodyTxs[4]).show(c);
    c.withStep(() => {
        arms.y = Math.sign(Math.round((Math.sin(scene.s * Math.PI * 1 + 1) + 1) / 2));
    });
    return c;
}

function head() {
    const c = container();
    hair(bodyTxs[0], 12, 22).show(c);
    Sprite.from(bodyTxs[1]).show(c);
    Sprite.from(bodyTxs[5]).show(c);
    hair(bodyTxs[3]).show(c);
    return c;
}

function hair(tx: Texture, ystart = 6, yend = 16) {
    const c = container();

    let y0 = 0;
    for (let y1 = ystart; y1 < yend; y1 += 1) {
        const t = new TilingSprite(tx).show(c);
        t.y = y0;
        t.tileTransform.position.y = -y0;
        t.width = tx.width;
        t.height = y1 - y0;
        y0 = y1;
    }

    c.withStep(() => {
        const f = Math.sin(scene.s * Math.PI * 0.25 + ystart * 19 + yend * 3);
        let seed = ystart * 1.2 - yend * 4;
        for (let i = 1; i < c.children.length; i++) {
            c.children[i].x = c.children[i - 1].x;
            c.children[i].x += Math.sin(scene.s * Math.PI + seed) * f;
            seed += Math.pow(i, 2) * 0.05 + i * 2.2;
        }
    })

    return c;
}