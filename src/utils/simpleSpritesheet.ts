import * as PIXI from "pixi.js";
import Texture = PIXI.Texture;
import Rectangle = PIXI.Rectangle;

export function subimageTextures(texture: Texture, subimages: number)
{
    const subimageWidth = texture.width / subimages;

    const subimageTextures: Texture[] = [];
    for (let i = 0; i < subimages; i++)
    {
        const subimageFrame = new Rectangle(i * subimageWidth, 0, subimageWidth, texture.height);
        const subimageTexture = new Texture(texture.baseTexture, subimageFrame);
        subimageTextures.push(subimageTexture);
    }
    return subimageTextures;
}