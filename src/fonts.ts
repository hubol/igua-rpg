import {BitmapFont, Texture} from "pixi.js";
import {default as axios} from "axios";
import {loadTextureAsync} from "./utils/resources/loadTexture";

export let AcrobatixFont: BitmapFont;
export let AtomixFont: BitmapFont;

export async function loadFontsAsync()
{
    AcrobatixFont = await loadBitmapFontAsync(
        require("./fonts/Acrobatix.fnt"),
        await loadTextureAsync(require("./fonts/Acrobatix_0.png")));

    AtomixFont = await loadBitmapFontAsync(
        require("./fonts/Atomix.fnt"),
        await loadTextureAsync(require("./fonts/Atomix_0.png")));
}

async function loadBitmapFontAsync(fntUrl: string, texture: Texture)
{
    const fntData = (await axios.get(fntUrl)).data;
    return BitmapFont.install(fntData, texture);
}