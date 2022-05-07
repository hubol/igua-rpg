import {ChoiceInput} from "../looksModel";
import {Container, Graphics, Sprite, Texture} from "pixi.js";
import {merge} from "../../../utils/object/merge";
import { UiNoneChoice } from "../../../textures";
import {trimFrame} from "../../../utils/pixi/trimFrame";
import {makeKeyRepeat} from "../makeKeyRepeat";
import {Key} from "../../../utils/browser/key";
import {cyclic} from "../../../utils/math/number";

const NoneChoice = trimFrame(UiNoneChoice);

export function choiceInput(input: ChoiceInput<Texture> & { value: number }, width = 96, height = 30) {
    const { allowNone, options } = input;
    const c = merge(new Container(), { selected: false });
    const g = new Graphics();

    const left = makeKeyRepeat(g, 'ArrowLeft');
    const right = makeKeyRepeat(g, 'ArrowRight');

    g.withStep(() => {
        g.clear().beginFill(0x005870);
        if (c.selected) {
            g.lineStyle(2, 0x00FF00, 1, 0);

            if (Key.isDown('ArrowLeft') && Key.isDown('ArrowRight')) {
                left.reset();
                right.reset();
            }
            if (left.justWentDown)
                input.value--;
            else if (right.justWentDown)
                input.value++;
            input.value = cyclic(input.value, allowNone ? -1 : 0, options.length);
        }

        g.drawRect(0, 0, width, height);
    });

    const maxWidth = Math.max(...options.map(x => x.width), allowNone ? 7 : 5 );
    const maxHeight = Math.max(...options.map(x => x.height), allowNone ? 7 : 5);

    let choiceCount = 0;
    let firstTime = true;
    function choice(texture: Texture, index: number) {
        const gw = maxWidth + 4;
        const s = Sprite.from(texture);
        s.x = gw / 2;
        s.x += choiceCount++ * (maxWidth + 2);
        s.anchor.set(Math.ceil(texture.width / 2) / texture.width, Math.ceil(texture.height / 2) / texture.height);
        const tint = index === -1 ? 0xD86050 : 0xffffff;
        s.withStep(() => {
            const selected = input.value === index;
            s.tint = selected ? tint : 0x002C38;
            if (selected) {
                const childrenIndex = allowNone ? index + 1 : index;
                const keepInsideLeft = choicesContainer.children[childrenIndex - 1] ?? s;
                const keepInsideRight = choicesContainer.children[childrenIndex + 1] ?? s;

                let iterations = firstTime ? 30 : 1;

                while (iterations-- > 0) {
                    const rightBounds = keepInsideRight.getBounds();
                    const left = keepInsideLeft.getBounds().x;
                    const right = rightBounds.x + rightBounds.width;

                    if (left < maxWidth / 2)
                        choicesContainer.x += 3;
                    else if (right > 94)
                        choicesContainer.x -= 3;
                }

                firstTime = false;
            }
        });
        return s;
    }

    const choicesContainer = new Container();
    choicesContainer.mask = new Graphics().beginFill(0xffffff).drawRect(2, 2, width - 4, height - 4);

    choicesContainer.y = 15;
    if (maxWidth < 15 && maxHeight < 15)
        choicesContainer.scale.set(2, 2);

    const choices = (allowNone ? [NoneChoice, ...options] : options)
        .map((x, i) => choice(x, allowNone ? i - 1 : i))

    choicesContainer.addChild(...choices)

    c.addChild(g, choicesContainer.mask, choicesContainer);

    return c;
}
