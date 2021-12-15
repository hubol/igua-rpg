import {Sprite, Texture} from "pixi.js";
import {scene} from "../igua/scene";

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
            return scene.parallax1Stage;
        case "TerrainDecals":
            return scene.gameObjectStage;
        default:
            return scene.backgroundGameObjectStage;
    }
}
