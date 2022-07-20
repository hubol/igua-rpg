import {container} from "../utils/pixi/container";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {VolcanoCurtain} from "../textures";
import {merge} from "../utils/object/merge";
import {Sprite} from "pixi.js";

const [ rodTx, curtainPieceTx ] = subimageTextures(VolcanoCurtain, 2);

export function privacyCurtain() {
    const c = merge(container(), { opened: 0 });
    const pieces = container();

    const count = 7;

    for (let i = 0; i < count; i++) {
        const piece = Sprite.from(curtainPieceTx)
            .withStep(() => {
                let ff = 8;
                if (i > 0)
                    piece.x = pieces.children[i - 1].x;
                else {
                    piece.x = -2;
                    ff = 2;
                }

                const f = Math.max(0, Math.min(1, (c.opened * count) - i));
                piece.x += f * ff;
            })
            .show(pieces);
        if (i % 2 === 1)
            piece.hueShift = 90;
    }

    c.addChild(Sprite.from(rodTx), pieces);
    c.pivot.set(1, 45);
    return c;
}