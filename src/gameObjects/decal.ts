import {Sprite, Texture} from "pixi.js";
import {DecalStyle} from "../../tools/gen-levelargs/types/decalStyle";
import {game} from "../igua/game";

export interface DecalArgs
{
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
    texture: Texture;
    style: DecalStyle;
}

export function resolveDecalGameObject(args: DecalArgs)
{
    const sprite = Sprite.from(args.texture);
    sprite.anchor.set(Math.round(sprite.width / 2) / sprite.width, Math.round(sprite.height / 2) / sprite.height);
    sprite.position.set(args.x, args.y);
    sprite.scale.set(args.scaleX, args.scaleY);
    sprite.rotation = args.rotation;
    return game.gameObjectStage.addChild(sprite);
}