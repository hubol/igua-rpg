import {Looks} from "./looksModel";
import {IguanaPuppetArgs} from "../puppet/iguanaPuppet";
import {Sprite} from "pixi.js";
import {footShapes, nailsShapes} from "./shapes";
import {colord} from "colord";
import {toHexColorString} from "../../utils/toHexColorString";
import {container} from "../../utils/pixi/container";

export function makeIguanaPuppetArgsFromLooks(looks: Looks): IguanaPuppetArgs {
    const backLeftFoot = makeFoot(looks.feet, "hind", true);
    const backRightFoot = makeFoot(looks.feet, "hind", false);
    const frontLeftFoot = makeFoot(looks.feet, "front", true);
    const frontRightFoot = makeFoot(looks.feet, "front", false);

    return {
        body: container(),
        crest: container(),
        eyes: container(),
        head: container(),
        backLeftFoot,
        backRightFoot,
        frontLeftFoot,
        frontRightFoot,
        fromLooks: true,
    };
}

function makeFootTint(color: number, back: boolean) {
    if (!back)
        return color;
    return colord(toHexColorString(color)).darken(0.2).saturate(0.1).toPixi();
}

type Feet = Looks['feet'];

function makeFoot(feet: Feet, key: 'hind' | 'front', back: boolean) {
    const foot = feet[key];
    const f = Sprite.from(footShapes[0]);
    if (foot.flipH)
        f.scale.x = -1;
    if (foot.flipV) {
        f.pivot.y -= f.height;
        f.scale.y = -1;
    }
    if (back)
        f.pivot.x -= feet.backOffset;
    const gap = (7 + feet.gap) / 2;
    f.pivot.x += key === 'front' ? -Math.ceil(gap) : Math.floor(gap);
    f.tint = makeFootTint(feet.color, back);
    const nails = Sprite.from(nailsShapes[0]);
    nails.tint = makeFootTint(feet.nailColor, back);
    nails.pivot.x -= foot.nails.placement;
    f.addChild(nails);
    return f;
}
