import {Sprite, Texture} from "pixi.js";

interface DecalGameObjectArgs
{
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
    texture: Texture;
}

export function decalGameObject(args: DecalGameObjectArgs)
{
    const sprite = Sprite.from(args.texture);
    sprite.anchor.set(Math.round(sprite.width / 2) / sprite.width, Math.round(sprite.height / 2) / sprite.height);
    sprite.position.set(args.x, args.y);
    sprite.scale.set(args.scaleX, args.scaleY);
    sprite.rotation = args.rotation;
    return sprite;
}