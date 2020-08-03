import {FontFamilyName, loadGoogleFontAsync} from "./utils/loadGoogleFont";
import {BitmapFont, Texture} from "pixi.js";
import {default as axios} from "axios";

export let RobotFont: FontFamilyName;
export let AcrobatixFont: BitmapFont;

export async function loadFontsAsync()
{
    [RobotFont, AcrobatixFont] = await Promise.all(
        [loadGoogleFontAsync("Roboto"),
            loadBitmapFontAsync(require("./fonts/Acrobatix.fnt"), Texture.from(require("./fonts/Acrobatix_0.png")))]);
}

async function loadBitmapFontAsync(fntUrl: string, texture: Texture)
{
    const fntData = (await axios.get(fntUrl)).data;
    return BitmapFont.install(fntData, texture);
}