import {BitmapFont, Texture} from "pixi.js";

export async function loadBitmapFontAsync(fntUrl: string, texture: Texture) {
    const fntData = await fetch(fntUrl).then(x => x.text());
    return BitmapFont.install(fntData, texture);
}