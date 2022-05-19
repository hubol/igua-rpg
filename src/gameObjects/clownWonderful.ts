import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {ClownWonderful} from "../textures";
import {Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import { player } from "./player";
import {hat} from "./hat";
import {sleep} from "../cutscene/sleep";
import {merge} from "../utils/object/merge";
import {Force} from "../utils/types/force";
import {approachLinear} from "../utils/math/number";

const textures = subimageTextures(ClownWonderful, { width: 30 });

export function clownWonderful() {
    const controls = {
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

                if (controls.lookAtPlayer)
                    eyes.texture = textures[playerIsRight ? 7 : 8];
                if (controls.facePlayer)
                    face.scale.x = playerIsRight ? 1 : -1;
                face.x = face.scale.x > 0 ? 14 : 13;
            });
        const myHat = hat(Sprite.from(textures[9]));
        const hair = Sprite.from(textures[10]);

        return merge(container(bald, face, eyes, myHat, hair), { hat: myHat });
    }

    function mkLegs() {
        return Sprite.from(textures[0]);
    }

    const head = mkHead();
    const c = container(mkLegs(), head)
        .withAsync(async () => {
            while (true) {
                await sleep(1000);
                head.hat.bounce();
            }
        });
    c.ext.isHatParent = true;
    c.pivot.set(14, 36);
    return c;
}