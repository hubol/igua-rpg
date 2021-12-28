import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Firefly} from "../textures";
import {animatedSprite} from "../igua/animatedSprite";
import {trackPosition} from "../igua/trackPosition";
import { lerp } from "../utils/math/number";
import {track} from "../igua/track";
import {Container} from "pixi.js";
import {merge} from "../utils/merge";
import {player} from "./player";
import {container} from "../utils/pixi/container";
import {now} from "../utils/now";
import {flake} from "./flake";
import {rng} from "../utils/rng";
import { ConsumeFirefly } from "../sounds";

const [t0, t1, ...fireTextures] = subimageTextures(Firefly, 6);
const flyTextures = [t0, t1];

const flameColors = [0xDAB276, 0xD1CB9E, 0xDF9D81];

function fireflyImpl() {
    let angle = 0;
    let isFleeing = false;
    let ii = 0;

    const c = merge(new Container(), { followPlayer: true, flee() {
            if (!isFleeing) {
                ConsumeFirefly.play();
            }
            isFleeing = true;
            c.followPlayer = false;
        } }).withStep(() => {
        c2.y += Math.sin(now.s * Math.PI * 4) * 0.33;

        if (isFleeing) {
            c.y -= 4;
            ii = (ii + 1) % 3;
            if (ii === 0) {
                const f = c.parent.addChildAt(flake().at(c), 0);
                f.tint = rng.choose(flameColors);
            }
        }

        if (!c.followPlayer)
            return;

        const target = [player.scale.x * -16, -12].add(player);
        const distance = c.vcpy().add(target, -1).vlength;
        const speed = lerp(1, distance * 0.25, Math.min(1, distance / 16));
        c.moveTowards(target, speed);
    });
    const t = trackPosition(c);

    const fire = animatedSprite(fireTextures, 0.1).withStep(() => {
        if (t.diff.x !== undefined)
            angle = lerp(angle, t.diff.x * -16, 0.5);
        fire.angle = Math.round(angle / 4) * 4;
    });

    const fly = animatedSprite(flyTextures, 0.1);

    fire.anchor.set(.5, 13/16);
    fly.anchor.copyFrom(fire.anchor);

    const c2 = container(fire, fly);
    c.addChild(c2);
    return c;
}

export const firefly = track(fireflyImpl);

export function consumeFirefly() {
    const fly = firefly.instances.find(x => x.followPlayer);
    if (fly) {
        player.invulnerableFrameCount = 60;
        fly.flee();
        return true;
    }
    return false;
}
