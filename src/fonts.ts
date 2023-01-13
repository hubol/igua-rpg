import {BitmapFont} from "pixi.js";
import {loadTextureAsync} from "./utils/resources/loadTexture";
import {loadBitmapFontAsync} from "./utils/resources/loadBitmapFont";

export let AcrobatixFont: BitmapFont;
export let AtomixFont: BitmapFont;
export let DiggitFont: BitmapFont;

export async function loadFontsAsync()
{
    AcrobatixFont = await loadBitmapFontAsync(
        require("./fonts/Acrobatix.fnt"),
        await loadTextureAsync(require("./fonts/Acrobatix_0.png")));

    AtomixFont = await loadBitmapFontAsync(
        require("./fonts/Atomix.fnt"),
        await loadTextureAsync(require("./fonts/Atomix_0.png")));

    DiggitFont = await loadBitmapFontAsync(
        require("./fonts/Diggit.fnt"),
        await loadTextureAsync(require("./fonts/Diggit.png")));
}

