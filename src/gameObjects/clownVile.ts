import {DisplayObject, Sprite} from "pixi.js";
import {
    VileClownEar,
    VileClownEyebrow,
    VileClownEyelid,
    VileClownHair,
    VileClownHead,
    VileClownMouth,
    VileClownPupil
} from "../textures";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {flipH} from "../utils/pixi/flip";
import {now} from "../utils/now";
import {moveTowards, Vector, vnew} from "../utils/math/vector";
import {lerp as nlerp} from "../utils/math/number";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";
import {lerp} from "../cutscene/lerp";
import {Force} from "../utils/types/force";

export function clownVile() {
    const controls = {
        eyeL: { pos: vnew() },
        eyeR: { pos: vnew() },
        facing: vnew(),
        blink: 0,
    }

    const behaviors = {
        facePlayer: true,
        lookAtPlayer: true,
    }

    function newEye() {
        const eyebrow = Sprite.from(VileClownEyebrow);
        const eyelid = Sprite.from(eyelidTxs[0]);
        const pupil = Sprite.from(VileClownPupil);
        const c = merge(container(pupil, eyelid, eyebrow), { pupil, blink: 0, eyebrow })
            .withStep(() => {
                const lookUpF = Math.min(pupil.y, 0) / 12;
                const min = 0.45 + lookUpF;
                const closed = nlerp(min, 1, c.blink);
                eyelid.texture = eyelidTxs[Math.floor(Math.max(0, Math.min(1, closed) * eyelidTxs.length))];
            });

        eyebrow.pivot.at(1, 7);
        pupil.pivot.at(-3, -3);
        c.pivot.at(0, -7);

        return c;
    }

    let __center = Force<DisplayObject>();

    function newHead() {
        const mask = Sprite.from(VileClownHead);
        const sprite = Sprite.from(VileClownHead);
        __center = sprite;
        const eyeL = newEye();
        const eyeR = newEye().at(15, 0);
        flipH(eyeR.eyebrow).pivot.x -= 1;
        const mouth = Sprite.from(mouthTxs[0]).at(-2, 18);
        const hair = newHair().at(-8, -14);
        const ears = newEars();
        const face = container(eyeL, eyeR, mouth.filter(alphaMaskFilter(mask)));

        const v = vnew();
        function directFacialFeatures() {
            const ftx = nlerp(-1, 22, (controls.facing.x + 1) / 2);
            const fty = nlerp(-3, 3, (controls.facing.y + 1) / 2);

            const etx = nlerp(2, -2, (controls.facing.x + 1) / 2);
            const ety = nlerp(1, -1, (controls.facing.y + 1) / 2);

            hair.pivot.at(0, Math.max(0, controls.facing.y) * -2).vround();

            face.moveTowards(v.at(ftx, fty), 1);
            ears.moveTowards(v.at(etx, ety), 1);
        }

        function adjustEyelids() {
            eyeL.blink = controls.blink;
            eyeR.blink = controls.blink;
        }

        function positionPupils() {
            eyeL.pupil.at(controls.eyeL.pos);
            eyeR.pupil.at(controls.eyeR.pos);
        }

        face
            .withStep(directFacialFeatures)
            .withStep(adjustEyelids)
            .withStep(positionPupils);

        return merge(container(mask, ears, sprite, hair, face), { eyeL, eyeR });
    }

    function newEars() {
        const earL = Sprite.from(VileClownEar).at(-7, 12);
        const earR = flipH(Sprite.from(VileClownEar)).at([53, 0].add(earL));
        return container(earL, earR);
    }

    function newHair() {
        const sprites = hairTxs.map(Sprite.from);
        const c = merge(container(...sprites), { rate: 1 })
            .withStep(() => {
                const r = c.rate * Math.PI * 2;
                sprites[1].at(Math.sin(now.s * r + 1) + 1, Math.cos(now.s * r * 0.9 - 2) + 1).vround();
                sprites[2].at(Math.sin(now.s * r * 1.1 + 2) * 2, Math.sin(now.s * -r + 3) - 1).vround();
                sprites[3].at(Math.cos(now.s * -r * 0.8 + 5) * 2 + 2, Math.cos(now.s * r - 6) - 1).vround();
            });

        return c;
    }

    function getTrajectory(d: Vector | DisplayObject) {
        const p = getWorldCenter(player);
        const c = 'parent' in d ? getWorldCenter(d) : d;
        return p.add(c, -1);
    }

    const head = newHead()
        .withStep(() => {
            const me = getWorldCenter(__center);
            const target = getTrajectory(me);
            const dist = target.vlength;
            target.normalize();

            if (behaviors.facePlayer)
                moveTowards(controls.facing, target, 0.1);
            if (behaviors.lookAtPlayer) {
                const l = dist < 40 ? getWorldCenter(head.eyeL) : me;
                const r = dist < 40 ? getWorldCenter(head.eyeR) : me;
                l.y = me.y;
                r.y = me.y;

                const f = Math.min(6, dist < 32 ? dist / 7 : dist / 32);
                const tl = getTrajectory(l).normalize().scale(f);
                const tr = getTrajectory(r).normalize().scale(f);

                moveTowards(controls.eyeL.pos, tl, 0.2);
                moveTowards(controls.eyeR.pos, tr, 0.2);
            }
        })
        .withAsync(async () => {
            while (true) {
                await sleep(500 + rng() * 2000);
                await lerp(controls, 'blink').to(1).over(170);
                await lerp(controls, 'blink').to(0).over(120);
            }
        });

    return head;
}

const eyelidTxs = subimageTextures(VileClownEyelid, 12);
const mouthTxs = subimageTextures(VileClownMouth, { width: 32 });
const hairTxs = subimageTextures(VileClownHair, 4);