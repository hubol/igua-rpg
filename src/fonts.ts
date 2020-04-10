import {FontFamilyName, loadGoogleFontAsync} from "./utils/loadGoogleFont";

export let RobotFont: FontFamilyName;

export async function loadFontsAsync()
{
    RobotFont = await loadGoogleFontAsync("Roboto");
}