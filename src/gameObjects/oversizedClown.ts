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
    const faceState = { anger: 0 };

    const fullHealth = 30;
    let health = fullHealth;

    const head = Sprite.from(headTexture);

    head.hitbox = [0.2, 0.2, 0.8, 1];
    const hair = Sprite.from(hairTexture);
    const c = container(head, hair, face(faceState));
    const speed = [0, 0];
    c.withStep(() => {
        if (health < fullHealth * 0.33)
            faceState.anger = 1 - (health / fullHealth);
        if (player.collides(head)) {
            health -= player.strength;
            bouncePlayer([33, 25].add(c));
            speed.x -= player.engine.knockback.x;
            speed.y -= player.vspeed;
            empBlast(128, rng.int(3) + 1, 50, 1000).at([33, 25].add(c)).show();
        }

        c.add(speed);
        speed.scale(0.8);
    });
    return c;
}

function face(state: { anger: number }) {
    const f = Sprite.from(faceTexture);
    const ll = Sprite.from(leftBrowTexture);
    ll.anchor.set(32/66, 14/51);
    const l = container(ll);
    const rr = Sprite.from(rightBrowTexture);
    rr.anchor.set(49/66, 14/51);
    const r = container(rr);

    l.withStep(() => {
        l.pivot.x = -32;
        l.pivot.y = -14 + Math.sin(now.s * Math.PI * 2.3 + 2);
        ll.angle = state.anger * 30 + Math.cos(now.s * Math.PI * 3.3 - 2) * 10 * state.anger;
    });
    r.withStep(() => {
        r.pivot.x = -49;
        r.pivot.y = -14 + Math.sin(now.s * Math.PI * 2.1 + 5);
        rr.angle = state.anger * -30 + Math.cos(now.s * Math.PI * 2.9 - 4) * 10 * state.anger;
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
