import {Container, Sprite, Texture} from "pixi.js";
import {PropertiesOf} from "../utils/types/propertiesOf";
import {merge} from "../utils/object/merge";
import {player} from "./player";
import {CollectGeneric} from "../sounds";
import {now} from "../utils/now";
import {ballons} from "./ballons";
import {trimFrame} from "../utils/pixi/trimFrame";
import {Force} from "../utils/types/force";

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
        onCollect() { },
        collectible: true,
    }).trimHitbox();
    if (progress[key])
        sprite.alpha = 0.5;
    return sprite
        .withStep(() => {
            if (sprite.collectible && sprite.collides(player))
            {
                CollectGeneric.play();
                (progress as any)[key] = true;
                sprite.onCollect();
                sprite.destroy();
            }
        });
}

export function makeFlyIn(piece: ReturnType<typeof bigKeyPiece>, down = 140) {
    piece.texture = trimFrame(piece.texture.clone());
    piece.hitbox = [0, 0, 1, 1];
    let ystart = Force<number>();
    let traveled = 0;
    piece.centerAnchor()
        .withStep(() => {
            if (ystart === undefined)
                ystart = piece.y;
            if (traveled < down)
                traveled++;
            piece.y = ystart + traveled + Math.sin(now.s * 2) * 2;
        })
    ballons({ target: piece, state: [1, 1, 1], offset: [0, 0], string: 18 });

    return piece;
}