import { Loader, Texture } from "pixi.js";

export async function loadTextureAsync(url: string)
{
    const loader = new Loader();
    loader.add(url);

    return new Promise<Texture>(resolve =>
        loader.load((_, resources) => resolve(resources[url]?.texture as Texture)))
}