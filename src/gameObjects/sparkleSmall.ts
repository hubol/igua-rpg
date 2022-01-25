import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {SparkleSmallLight} from "../textures";
import {animatedSprite} from "../igua/animatedSprite";
import {Container} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/rng";

const textures = subimageTextures(SparkleSmallLight, 3);

function sparkle() {
    return animatedSprite(textures, 1 / 11)
        .liveFor(60)
        .centerAnchor();
}

export function sparkly(o: Container) {
    // @ts-ignore
    if (o.__sparkly)
        return;
    // @ts-ignore
    o.__sparkly = true;
    return o.withAsync(async () => {
        while (true) {
            o.parent.addChild(sparkle().at([o.width * rng(), o.height * rng()].add(o)));
            await sleep(250 + rng.int(200));
        }
    });
}