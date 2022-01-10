import {OversizedAngel} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Sprite} from "pixi.js";
import {now} from "../utils/now";
import {container} from "../utils/pixi/container";
import {player} from "./player";
import {approachLinear} from "../utils/math/number";
import {scene} from "../igua/scene";
import {bouncePlayer} from "../igua/bouncePlayer";
import {empBlast} from "./empBlast";
import {rng} from "../utils/rng";

const [headTexture, faceTexture, hairTexture, leftBrowTexture, rightBrowTexture] =
    subimageTextures(OversizedAngel, { width: 66 });

export function oversizedClown() {
    const head = Sprite.from(headTexture);
    head.hitbox = [0.2, 0.2, 0.8, 0.8];
    const hair = Sprite.from(hairTexture);
    head.addChild(hair, face());
    const speed = [0, 0];
    head.withStep(() => {
        if (player.collides(head)) {
            bouncePlayer([33, 25].add(head));
            speed.x -= player.engine.knockback.x;
            speed.y -= player.vspeed;
            empBlast(128, rng.int(3) + 1, 50, 1000).at([33, 25].add(head)).show();
        }

        head.add(speed);
        speed.scale(0.8);
    })
    return head;
}

function face() {
    const f = Sprite.from(faceTexture);
    const l = Sprite.from(leftBrowTexture);
    const r = Sprite.from(rightBrowTexture);

    l.withStep(() => {
        l.pivot.y = Math.sin(now.s * Math.PI * 2.3 + 2);
    });
    r.withStep(() => {
        r.pivot.y = Math.sin(now.s * Math.PI * 2.1 + 5);
    });

    const c = container(f, l, r)
    c.withStep(() => {
        c.pivot.y = Math.sin(now.s * Math.PI * 2);
    });
    c.pivot.x = 41;
    c.scale.x = 1;
    let facing = 1;
    const c2 = container(c).withStep(() => {
        const b = c2.getBounds();
        const x = b.x + b.width / 2 + scene.camera.x;
        const facingUnbounded = (player.x - x) / 60;
        const facingTarget = (Math.min(1, Math.abs(facingUnbounded)) * Math.sign(facingUnbounded) + 1) / 2;
        facing = approachLinear(facing, facingTarget, 0.05);
        const pivotXNext = 20 * (1 - facing) - c.pivot.x;
        if (Math.abs(c2.pivot.x - pivotXNext) > 2)
            c2.pivot.x = pivotXNext;
        c.scale.x = facing > 0.5 ? 1 : -1;
    });
    return c2;
}
