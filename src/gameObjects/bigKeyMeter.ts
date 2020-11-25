import {Container, Sprite, Texture} from "pixi.js";

export function bigKeyMeter<T>(...pieces: [Texture, boolean][])
{
    const container = new Container();
    pieces.forEach(x => {
        const sprite = new Sprite(x[0]);
        sprite.tint = x[1] ? 0xffffff : 0;
        container.addChild(sprite);
    });
    return container;
}