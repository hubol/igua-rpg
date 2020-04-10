import WebFont from "webfontloader";

export type FontFamilyName = string;

export function loadGoogleFontAsync(fontFamilyName: FontFamilyName)
{
    return new Promise<FontFamilyName>(resolve => {
        WebFont.load({
            google: {
                families: [ fontFamilyName ]
            },
            active: () => resolve(fontFamilyName),
            inactive: () => {
                console.error(`WebFontLoader failed to load ${fontFamilyName}.`);
                resolve(fontFamilyName);
            }
        });
    })
}