import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {SparkleSmallLight} from "../textures";
import {animatedSprite} from "../igua/animatedSprite";
import {Container, Rectangle} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";

const textures = subimageTextures(SparkleSmallLight, 3);

function sparkle() {
    return animatedSprite(textures, 1 / 11)
        .liveFor(60)
        .centerAnchor();
}

const r = new Rectangle();

export function sparkleOnce(o: Container, dst = o.parent) {
    const { tx: px, ty: py } = dst.worldTransform;
    const { x, y, width, height } = o.getBounds(false, r);
    const s = sparkle().at(width * rng() + (x - px), height * rng() + (y - py));
    s.alpha = o.ext.sparkleAlpha ?? 1;
    dst.addChild(s);
}

export function sparkly(o: Container) {
    // @ts-ignore
    if (o.__sparkly)
        return;
    // @ts-ignore
    o.__sparkly = true;
    return o.withAsync(async () => {
        while (true) {
            sparkleOnce(o);
            const ms = o.ext.sparkleSleep ?? 250;
            await sleep(ms + rng.int(ms - 50));
        }
    });
}