import {BitmapFont, Texture} from "pixi.js";
import {default as axios} from "axios";

export let AcrobatixFont: BitmapFont;

export async function loadFontsAsync()
{
    AcrobatixFont = await
            loadBitmapFontAsync(require("./fonts/Acrobatix.fnt"), Texture.from(require("./fonts/Acrobatix_0.png")));
}

async function loadBitmapFontAsync(fntUrl: string, texture: Texture)
{
    const fntData = (await axios.get(fntUrl)).data;
    return BitmapFont.install(fntData, texture);
}