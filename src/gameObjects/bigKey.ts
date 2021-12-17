import {Container, Sprite, Texture} from "pixi.js";
import {PropertiesOf} from "../utils/types/propertiesOf";
import {merge} from "../utils/merge";
import {player} from "./player";
import {CollectGeneric} from "../sounds";

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

export function bigKeyPiece<T>(progress: T, texture: Texture, key: keyof PropertiesOf<T, boolean>)
{
    const sprite = merge(new Sprite(texture), {
        onCollect() { }
    }).trimHitbox();
    if (progress[key])
        sprite.alpha = 0.5;
    return sprite
        .withStep(() => {
            if (sprite.collides(player))
            {
                CollectGeneric.play();
                (progress as any)[key] = true;
                sprite.onCollect();
                sprite.destroy();
            }
        });
}
