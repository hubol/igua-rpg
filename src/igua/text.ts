import {BitmapText} from "pixi.js";
import {AcrobatixFont} from "../fonts";

type Style = Omit<ConstructorParameters<typeof BitmapText>[1], "fontName">;

export const IguaText = {
    Large(text = '', style: Style = {}) {
        return new BitmapText(text, { fontName: AcrobatixFont.font, ...style });
    }
}
