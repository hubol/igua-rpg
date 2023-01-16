import {BombSparks, PoisonBomb} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {animatedSprite} from "../igua/animatedSprite";
import {rng} from "../utils/math/rng";
import {range} from "../utils/range";
import {nlerp} from "../utils/math/number";
import {Graphics} from "pixi.js";
import {scene} from "../igua/scene";
import {Dithered} from "../pixins/dithered";
import {getWorldPos} from "../igua/gameplay/getCenter";
import {playerCollidesCircle} from "../igua/logic/playerCollidesCircle";
import {player} from "./player";
import {PoisonBombBurn, PoisonBombExplode} from "../sounds";

const bombTxs = subimageTextures(PoisonBomb, 8);
const sparkTxs = subimageTextures(BombSparks, 5);

export function poisonBomb() {
    const c = merge(container(), { lit: false, life: 1 }).withGravityAndWallResist([0, -9], 7, 0.3);

    const bomb = animatedSprite(bombTxs, 0)
        .show(c);
    bomb.anchor.set(0.5, 1);

    const spark = animatedSprite(sparkTxs, 0.2)
        .at(0, -18)
        .show(c);
    spark.scale.x = rng.bool ? 1 : -1;
    spark.anchor.set(0.5, 1);

    let sound = 100;

    c.withStep(() => {
        spark.visible = c.lit;
        bomb.imageIndex = Math.max(0, Math.min(7, Math.floor((1 - c.life) * 8)));
        spark.pivot.y = -bomb.imageIndex;

        if (c.lit)
            c.life = Math.max(0, c.life - (1 / 60));

        if (c.life <= 0) {
            poisonBombExplosion().at(c).show(c.parent);
            c.destroy();
        }
        else {
            if (sound >= 4) {
                sound = 0;
                // @ts-ignore
                PoisonBombBurn.rate((1 - c.life) * 0.2 + 1).play();
            }
            else
                sound++;
        }

        if (c.isOnGround)
            c.speed.x = 0;
    });

    return c;
}

function poisonBombExplosion(radius = 64) {
    const c = container()
    const back = manyCircles(radius).withPixin(Dithered()).tinted(0xA6B76C).show(c);
    back.scale.set(0.2);
    const front = manyCircles(radius * 0.75).withPixin(Dithered()).tinted(0x4B6829).show(c);
    front.scale.set(0.3);

    let bscale = back.scale.x;
    let fscale = front.scale.x;

    PoisonBombExplode.play();

    let life = 30;
    let active = -2;
    return c.withStep(() => {
        if (active > 0 && active < 30) {
            const v = getWorldPos(c);
            if (playerCollidesCircle(v.x, v.y, radius * 0.5) && c.effectPlayer('poison')) {
                player.vspeed = Math.min(player.vspeed, -2);
            }
        }

        active += 1;

        bscale = nlerp(bscale, 1, 0.4);
        fscale = nlerp(bscale, 1, 0.1);

        back.scale.set(Math.round(bscale * 16) / 16);
        front.scale.set(Math.round(fscale * 16) / 16);

        if (life > 0)
            return life--;
        back.dither -= 0.05;
        front.dither -= 0.02;

        if (front.dither <= 0)
            c.destroy();
    });
}

function manyCircles(totalRadius: number) {
    const minRadius = Math.sqrt(totalRadius);
    const maxRadius = totalRadius / 2;

    const circles = range(20).map(i => {
        const radius = nlerp(minRadius, maxRadius, rng());
        const vector = rng.unitVector;
        const length = (totalRadius - radius) * (Math.min(1, i / 6) - rng() * 0.2);
        const timeScale = nlerp(1, 3, rng());
        return {...(vector.scale(length)), radius, timeScale};
    });

    let steps = -1;
    const g = new Graphics()
        .withStep(() => {
            if (steps > 0)
                return steps--;
            steps = 4;
            g.clear().beginFill(0xffffff);
            for (const circle of circles) {
                g.drawCircle(circle.x, circle.y, circle.radius + (Math.sin(scene.s * Math.PI * circle.timeScale) + 1));
            }
        });

    return g;
}