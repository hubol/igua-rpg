import * as PIXI from "pixi.js";
import Texture = PIXI.Texture;
import Rectangle = PIXI.Rectangle;

type Width = { width: number };
type Args = Width | number;

export function subimageTextures(texture: Texture, args: Args) {
    // @ts-ignore
    const count = typeof args === 'number' ? args : Math.floor(texture.frame.width / args.width);
    return split(texture, count);
}

function split(texture: Texture, count: number)
{
    const subimageWidth = texture.frame.width / count;

    const subimageTextures: Texture[] = [];
    for (let i = 0; i < count; i++)
    {
        const subimageFrame = new Rectangle(texture.frame.x + i * subimageWidth, 0, subimageWidth, texture.height);
        const subimageTexture = new Texture(texture.baseTexture, subimageFrame);
        subimageTextures.push(subimageTexture);
    }
    return subimageTextures;
}
