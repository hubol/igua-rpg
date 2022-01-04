import {button} from "./button";
import {subimageTextures} from "../../../utils/pixi/simpleSpritesheet";
import {Sprite} from "pixi.js";
import {UiCheckbox} from "../../../textures";

const [unchecked, checked] = subimageTextures(UiCheckbox, 2);

export function checkboxInput(text: string, input: { value: boolean }, width = 96, height = 30) {
    const b = button(text, () => { input.value = !input.value });
    const s = Sprite.from(unchecked).withStep(() => s.texture = input.value ? checked : unchecked);
    b.addChild(s);

    return b;
}
