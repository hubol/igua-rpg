import {BitmapText} from "pixi.js";
import {AcrobatixFont, AtomixFont, DiggitFont} from "../fonts";

type Style = Omit<ConstructorParameters<typeof BitmapText>[1], "fontName">;

export const IguaText = {
    Small(text = '', style: Style = {}) {
        return new BitmapText(text, { fontName: AtomixFont.font, ...style });
    },
    Large(text = '', style: Style = {}) {
        return new BitmapText(text, { fontName: AcrobatixFont.font, ...style });
    },
    MediumDigits(text = '', style: Style = {}) {
        return new BitmapText(text, { fontName: DiggitFont.font, ...style });
    },
}
