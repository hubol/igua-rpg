import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {ArrowPoison, ClownWonderful, ClownWonderfulThrow} from "../textures";
import {Graphics, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import { player } from "./player";
import {hat} from "./hat";
import {sleep} from "../cutscene/sleep";
import {merge} from "../utils/object/merge";
import {Force} from "../utils/types/force";
import {approachLinear} from "../utils/math/number";
import {vnew} from "../utils/math/vector";

const textures = subimageTextures(ClownWonderful, { width: 30 });
const throwTxs = subimageTextures(ClownWonderfulThrow, 3);

export function clownWonderful() {
    const controls = {
        throw: {
            on: false,
            showHeight: false,
            height: 0,
            phase: 0,
            faceRight: true,
        }
    };

    const behaviors = {
        lookAtPlayer: true,
        facePlayer: true,
    };

    function mkHead() {
        const bald = Sprite.from(textures[5]);
        const face = Sprite.from(textures[6]);
        face.anchor.x = 14 / face.width;

        let playerX = Force<number>();

        const eyes = Sprite.from(textures[7])
            .withStep(() => {
                if (playerX === undefined)
                    playerX = player.x;
                else
                    playerX = approachLinear(playerX, player.x, 2);

                const playerIsRight = playerX > c.x;

                if (behaviors.lookAtPlayer)
                    eyes.texture = textures[playerIsRight ? 7 : 8];
                if (behaviors.facePlayer)
                    face.scale.x = playerIsRight ? 1 : -1;
                face.x = face.scale.x > 0 ? 14 : 13;
            });
        const myHat = hat(Sprite.from(textures[9]));
        const hair = Sprite.from(textures[10]);

        return merge(container(bald, face, eyes, myHat, hair), { hat: myHat });
    }

    function mkThrow() {
        const s = Sprite.from(throwTxs[0])
            .withStep(() => {
                s.texture = throwTxs[controls.throw.phase];
                s.visible = !controls.throw.showHeight;
            });

        const c = container(s)
            .withStep(() => {
                c.visible = controls.throw.on;
                c.scale.x = controls.throw.faceRight ? -1 : 1;
                c.pivot.x = controls.throw.faceRight ? 24 : -3;
            });

        const hs = vnew();
        const hd = vnew();

        const h = Sprite.from(ArrowPoison).centerAnchor();
        h.scale.x = -1;
        const g = new Graphics()
            .withStep(() => {
                hs.at(14, 11);
                hd.at(10, 2 - controls.throw.height);

                g
                    .clear()
                    .lineStyle(2, 0xffffff)
                    .moveTo(hs.x, hs.y)
                    .lineTo(hd.x, hd.y)
                    .lineStyle()
                    .beginFill(0xffffff)
                    .drawCircle(hd.x, hd.y, 3);
                h.at(hd);
            });

        const hc = container(g, h)
            .withStep(() => hc.visible = controls.throw.showHeight);

        c.addChild(hc);

        c.pivot.set(-3, -16);

        return c;
    }

    function mkLegs() {
        return Sprite.from(textures[0]);
    }

    async function throwArrowWip() {
        controls.throw.on = true;
        controls.throw.phase = 0;
        controls.throw.showHeight = false;
        await sleep(250);
        controls.throw.phase = 1;
        await sleep(250);
        controls.throw.showHeight = true;
        await sleep(250);
        controls.throw.phase = 2;
        controls.throw.showHeight = false;
        await sleep(250);
        controls.throw.on = false;
    }

    const head = mkHead();
    const c = container(mkLegs(), head, mkThrow())
        .withAsync(async () => {
            while (true) {
                await sleep(1000);
                head.hat.bounce();
            }
        })
        .withAsync(async () => {
            while (true) {
                await sleep(250);
                await throwArrowWip();
                controls.throw.faceRight = !controls.throw.faceRight;
                controls.throw.height = (controls.throw.height + 2) % 32;
            }
        });
    c.ext.isHatParent = true;
    c.pivot.set(14, 36);
    return c;
}