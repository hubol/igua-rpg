import {Sprite, Texture} from "pixi.js";
import {scene} from "../igua/scene";
import {track} from "../igua/track";

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

function resolveDecalGameObjectImpl(args: DecalArgs)
{
    const sprite = Sprite.from(args.texture);
    sprite.anchor.set(Math.round(sprite.width * args.originX) / sprite.width, Math.round(sprite.height * args.originY) / sprite.height);
    sprite.position.set(args.x, args.y).vround();
    sprite.scale.set(args.scaleX, args.scaleY);
    sprite.rotation = args.rotation;
    return getStage(args.layerName).addChild(sprite);
}

export const resolveDecalGameObject = track(resolveDecalGameObjectImpl);
export const decal = resolveDecalGameObject;

export function decalsOf(texture: Texture) {
    return decal.instances.filter(x => x.texture === texture);
}

function getStage(layerName: string)
{
    switch (layerName)
    {
        case "Parallax1Decals":
            return scene.parallax1Stage;
        case "TerrainDecals":
            return scene.gameObjectStage;
        case "CloseTerrainDecals":
            return scene.terrainDecalsStage;
        case "FrontDecals":
            return scene.playerStage;
        default:
            return scene.backgroundGameObjectStage;
    }
}
