import {button} from "./button";
import {Sprite} from "pixi.js";
import {MessageBox} from "../../../textures";
import {PageElement} from "./page";
import {findChoiceInputs, findColorInputs} from "../findColorValues";
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

    function randomizeShapes() {
        const inputs = findChoiceInputs(looksContext.inputModel);
        inputs.forEach(x => x.value = rng.int(x.options.length + (x.allowNone ? 1 : 0)) - (x.allowNone ? 1 : 0));
    }

    const randomColors = button('Random Colors', randomizeColors).center().jiggle();
    const randomShapes = button('Random Shapes', randomizeShapes).center().jiggle();
    const back = button('Back', looksContext.back);
    randomShapes.y = 33;
    back.y = randomShapes.y + 30 + 15;
    return [randomColors, randomShapes, back];
}
