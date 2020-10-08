import {BitmapFont, Texture} from "pixi.js";
import {default as axios} from "axios";

export async function loadBitmapFontAsync(fntUrl: string, texture: Texture) {
    const fntData = (await axios.get(fntUrl)).data;
    return BitmapFont.install(fntData, texture);
}