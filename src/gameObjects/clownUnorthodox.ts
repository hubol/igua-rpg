import {container} from "../utils/pixi/container";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {
    UnorthodoxClownEye,
    UnorthodoxClownEyebrow, UnorthodoxClownFace,
    UnorthodoxClownHair,
    UnorthodoxClownHead,
    UnorthodoxClownMouth
} from "../textures";
import {Graphics, Sprite} from "pixi.js";
import {now} from "../utils/now";
import {merge} from "../utils/merge";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/rng";
import {approachLinear, lerp as nlerp} from "../utils/math/number";
import {moveTowards, Vector, vnew} from "../utils/math/vector";
import {player} from "./player";
import {rectangleDistance} from "../utils/math/rectangleDistance";

const hairTextures = subimageTextures(UnorthodoxClownHair, 3);
const mouthTxs = subimageTextures(UnorthodoxClownMouth, 4);
const eyeTxs = subimageTextures(UnorthodoxClownEye, 3);

export function clownUnorthodox() {
    const controls = {
        face: {
            unit: -1,
        },
        eyes: {
            closedUnit: 0,
            closing: false,
            forceWide: false,
        },
        pupils: {
            left: vnew(),
            right: vnew(),
            forceCenter: false,
        },
        brows: {
            angry: false
        },
        mouth: {
            excited: false,
            big: false,
        }
    };

    const behaviors = {
        facePlayer: true,
    };

    function hair() {
        const wigglies = [hairTextures[1], hairTextures[2]].map((x, i) => {
            const s = Sprite.from(x);
            s.y = 16;
            s.anchor.y = s.y / 30;
            s.withStep(() => {
                s.scale.y = 1 + (1 + Math.sin(now.s * Math.PI * 3 + i * 0.3)) * 0.125 / 3;
                s.height = Math.round(s.height / 2) * 2;
            });
            return s;
        })
        const c = container(Sprite.from(hairTextures[0]), ...wigglies);
        c.pivot.set(1, 1);
        return c;
    }

    function eyebrow() {
        const s = Sprite.from(UnorthodoxClownEyebrow)
            .withStep(() => {
                s.angle = (controls.brows.angry ? 40 : 0) * Math.sign(s.scale.x);
                s.y = controls.brows.angry ? ((now.s * 4) % 1) : 0;
            });
        s.anchor.set(6/14, 2/8);
        return s;
    }

    function newMouth() {
        const subimages = [1, 0, 1, 2, 3, 2];
        let index = 0;

        const s = Sprite.from(mouthTxs[2])
            .withStep(() => {
                let i = controls.mouth.excited ? subimages[Math.floor(index) % subimages.length] : 2;
                if (controls.mouth.big)
                    i = 3;
                s.texture = mouthTxs[i];
                if (controls.mouth.excited)
                    index += 0.2;
            });
        return s;
    }

    function newEye(p: Vector) {
        const eye = container();

        const pupil = Sprite.from(eyeTxs[1])
            .withStep(() => pupil.at(p));

        const pupilc = container(pupil).show(eye);
        pupilc.mask = Sprite.from(eyeTxs[0]).show(pupilc);

        const lids = new Graphics()
            .withStep(() => {
                lids.clear();

                const y = Math.round(7 * controls.eyes.closedUnit) + 6;
                if (controls.eyes.forceWide)
                    return;
                lids
                    .beginFill(0xffffff)
                    .drawRect(1, 0, 13, y)
                    .endFill()
                    .lineStyle(1, 0x0D1C7C)
                    .moveTo(1, y)
                    .lineTo(13, y);
            })
            .show(eye);

        Sprite.from(eyeTxs[2]).show(eye);

        return eye;
    }

    function newHead() {
        const bald = Sprite.from(UnorthodoxClownHead);
        bald.pivot.set(-11, -16);
        bald.mask = Sprite.from(UnorthodoxClownHead).show(bald);

        const face = container().show(bald);

        const eyeL = newEye(controls.pupils.left);
        const eyeR = newEye(controls.pupils.right);
        const cer = container(eyeR).at(15, 0);
        const eyes = container(eyeL, cer).at(23, 6).show(face);

        const mouth = newMouth().at(29, 24).show(face);

        const features = Sprite.from(UnorthodoxClownFace).at(8, 19).show(face);

        const browL = eyebrow();
        const browR = eyebrow();
        browR.scale.x = -1;
        const cbr = container(browR).at(15, 0);

        const v = vnew();

        const brows = container(browL, cbr);
        face.withStep(() => {
            if (behaviors.facePlayer) {
                const f = player.getBounds().center.add(hitbox.getBounds().center, -1).normalize();
                controls.face.unit = approachLinear(controls.face.unit, f.x, 0.05);

                v.at(f.x * 4, nlerp(-2, 5, (f.y + 1) / 2));
                moveTowards(controls.pupils.left, v, 1);
                controls.pupils.right.at(controls.pupils.left);
            }

            if (controls.pupils.forceCenter) {
                controls.pupils.left.at(0, 0);
                controls.pupils.right.at(controls.pupils.left);
            }

            const f = (controls.face.unit + 1) / 2;
            face.x = nlerp(-19, 1, f);

            const yf = Math.max(0, (Math.abs(controls.face.unit) - .8) * 5);
            face.y = yf * -1;

            brows.at(face).add(41, 18);

            if (behaviors.facePlayer) {
                const d = rectangleDistance(hitbox, player);
                if (d < 10)
                    brows.y -= 1;
                if (d < 20)
                    brows.y -= 1;
            }
        });

        const hitbox = new Graphics()
            .beginFill(0)
            .drawRect(15, 15, 50, 33)
            .show(bald);
        hitbox.visible = false;

        const c = container(bald, hair(), brows, hitbox);

        return merge(c, { mouth });
    }

    const head = newHead();

    head
        .withStep(() => {
            controls.eyes.closedUnit = approachLinear(controls.eyes.closedUnit, controls.eyes.closing ? 1 : 0, 0.1);
        })
        .withAsync(async () => {
            while (true) {
                await sleep(2000);
                controls.mouth.excited = true;
                await sleep(2000);
                controls.mouth.excited = false;
                controls.mouth.big = true;
                await sleep(2000);
                controls.mouth.big = false;
            }
        })
        .withAsync(async () => {
            // while (true) {
            //     await sleep(4000);
            //     behaviors.facePlayer = !behaviors.facePlayer;
            // }
        })
        .withAsync(async () => {
            while (true) {
                await sleep(500 + rng.int(2500));
                controls.eyes.closing = true;
                await sleep(220);
                controls.eyes.closing = false;
                await sleep(200);
            }
        })

    return head;
}