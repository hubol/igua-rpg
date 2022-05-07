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
    dst.addChild(sparkle().at(width * rng() + (x - px), height * rng() + (y - py)));
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
            await sleep(250 + rng.int(200));
        }
    });
}