import {button} from "./button";
import {Sprite} from "pixi.js";
import {MessageBox} from "../../../textures";
import {PageElement} from "./page";
import {findColorInputs} from "../findColorValues";
import {looksContext} from "./looksUiRoot";
import {rng} from "../../../utils/rng";

export function inspirationButton() {
    const b = button('Inspiration', () => looksContext.into('Inspiration', inspirationPageElements()));
    b.pivot.y -= 15;
    const pad = Sprite.from(MessageBox);
    pad.height = 45;
    pad.alpha = 0;
    b.addChild(pad)
    return b;
}

function inspirationPageElements(): PageElement[] {
    function randomizeColors() {
        const inputs = findColorInputs(looksContext.inputModel);
        inputs.forEach(x => x.value = rng.color);
    }

    const randomColors = button('Random Colors', randomizeColors).center().jiggle();
    const back = button('Back', looksContext.back);
    back.y = 45;
    return [randomColors, back];
}
