import {Container, Sprite, Texture} from "pixi.js";
import {merge} from "../utils/merge";

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