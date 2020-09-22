import {Sprite, Texture} from "pixi.js";
import {game} from "../igua/game";

export interface DecalArgs
{
    x: number;
    y: number;
    originX: number;
    originY: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
    texture: Texture;
    layerName: string;
}

export function resolveDecalGameObject(args: DecalArgs)
{
    const sprite = Sprite.from(args.texture);
    sprite.anchor.set(Math.round(sprite.width * args.originX) / sprite.width, Math.round(sprite.height * args.originY) / sprite.height);
    sprite.position.set(args.x, args.y);
    sprite.scale.set(args.scaleX, args.scaleY);
    sprite.rotation = args.rotation;
    return getStage(args.layerName).addChild(sprite);
}

function getStage(layerName: string)
{
    switch (layerName)
    {
        case "Parallax1Decals":
            return game.parallax1Stage;
        default:
            return game.backgroundGameObjectStage;
    }
}