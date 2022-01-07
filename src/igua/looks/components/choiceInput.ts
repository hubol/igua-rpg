import {ChoiceInput} from "../looksModel";
import {Container, Graphics, Sprite, Texture} from "pixi.js";
import {merge} from "../../../utils/merge";
import { UiNoneChoice } from "../../../textures";
import {trimFrame} from "../../../utils/pixi/trimFrame";

const NoneChoice = trimFrame(UiNoneChoice);

export function choiceInput(input: ChoiceInput<Texture> & { value: number }, width = 96, height = 30) {
    const { allowNone, options } = input;
    const c = merge(new Container(), { selected: false });
    const g = new Graphics();

    g.withStep(() => {
        g.clear().beginFill(0x005870);
        if (c.selected)
            g.lineStyle(2, 0x00FF00, 1, 0);
        g.drawRect(0, 0, width, height);
    });

    const maxWidth = Math.max(...options.map(x => x.width), allowNone ? 7 : 0 );
    const maxHeight = Math.max(...options.map(x => x.height), allowNone ? 7 : 0);

    let choiceCount = 0;
    function choice(texture: Texture, index: number) {
        const gw = maxWidth + 4;
        const gh = 15;
        const s = Sprite.from(texture).at(gw / 2, gh / 2);
        s.x += choiceCount++ * (maxWidth + 2);
        s.anchor.set(Math.ceil(texture.width / 2) / texture.width, Math.ceil(texture.height / 2) / texture.height);
        const tint = index === -1 ? 0xD86050 : 0xffffff;
        s.withStep(() => {
           s.tint = input.value === index ? tint : 0x002C38;
        });
        return s;
    }

    const choicesContainer = new Container();

    if (maxWidth < 15 && maxHeight < 15)
        choicesContainer.scale.set(2, 2);

    const choices = (allowNone ? [NoneChoice, ...options] : options)
        .map((x, i) => choice(x, allowNone ? i - 1 : i))

    choicesContainer.addChild(...choices)

    c.addChild(g, choicesContainer);

    return c;
}
