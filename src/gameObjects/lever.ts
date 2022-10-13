import {Container, Sprite, Texture} from "pixi.js";
import {merge} from "../utils/object/merge";
import {progress} from "../igua/data/progress";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {JungleLever} from "../textures";
import {approachLinear} from "../utils/math/number";
import {ActivateLever} from "../sounds";

export function lever(baseTexture: Texture, handleTexture: Texture, angle: number)
{
    const handle = new Sprite(handleTexture);
    handle.angle = angle;
    const base = new Sprite(baseTexture);
    [base, handle].forEach(x => x.anchor.set(0.5, 1));

    const container = merge(new Container(), {
        get angle() {
            return handle.angle;
        },
        set angle(value) {
            handle.angle = value;
        }
    });

    container.addChild(handle, base);

    return container;
}

export function leverOpinionated(tex3: Texture, onFn: () => boolean) {
    const offAngle = 45;

    const getTargetAngle = () => onFn() ? -offAngle : offAngle;

    const t = subimageTextures(tex3, 3);
    const l = lever(t[2], t[1], getTargetAngle())
        .withStep(() => {
            l.angle = approachLinear(l.angle, getTargetAngle(), 5);
        });
    const s = Sprite.from(t[0]);
    s.anchor.set(0.5, 1);
    l.addChildAt(s, 0);
    return l;
}