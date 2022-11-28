import {messageBox} from "./dialog";
import {sleep} from "./sleep";
import {waitForInput} from "./waitForInput";
import {merge} from "../utils/object/merge";
import {container} from "../utils/pixi/container";
import {wait} from "./wait";
import {Graphics, Sprite} from "pixi.js";
import {IguaText} from "../igua/text";
import {CapitalQuizChoice, Dither} from "../textures";
import {iguanaHead} from "../igua/puppet/iguanaPuppet";
import {playerPuppetArgs} from "../gameObjects/player";
import {ImpossiblePuzzleNotch, QuizChoice, SelectOption} from "../sounds";
import {Action, Input} from "../igua/io/input";
import {cyclic} from "../utils/math/number";
import {Dithered} from "../pixins/dithered";
import {now} from "../utils/now";

export async function quiz(message: string, correctIndex: number, ...choices: string[]) {
    const root = container().show();
    const msg = messageBox(message).show(root);
    new Graphics().lineStyle(3, 0x00ff00).beginFill(0x005870).drawRect(2, 1, 208 - 3, 120).show(msg, 1);

    let skip = false;
    Promise.race((<Action[]>['Confirm', 'SelectUp', 'SelectDown']).map(waitForInput)).then(() => skip = true);

    const c = newChoices(choices).show(msg);
    for (const choice of choices) {
        if (!skip) {
            await Promise.race([
                sleep(500),
                wait(() => skip),
            ]);
            ImpossiblePuzzleNotch.play();
        }
        c.length += 1;
    }

    const picker = container().withStep(() => {
            const pselection = c.selection;
            const nothing = c.selection === -1;

            if (Input.justWentDown('SelectUp'))
                c.selection = nothing ? choices.length - 1 : c.selection - 1;
            if (Input.justWentDown('SelectDown'))
                c.selection = nothing ? 0 : c.selection + 1;
            if (nothing && Input.justWentDown('Confirm'))
                c.selection = 0;

            if (pselection !== c.selection) {
                c.selection = cyclic(c.selection, 0, choices.length);
                SelectOption.play();
            }
        })
        .show(c);

    await wait(() => c.selection !== -1);
    await waitForInput('Confirm');
    QuizChoice.play();
    c.picked = true;
    picker.destroy();
    await sleep(1000);
    root.destroy();
    return c.selection === correctIndex;
}

function newChoices(text: string[]) {
    const c = merge(container(), { length: 0, selection: -1, picked: false }).at(14, 65);

    text.forEach((x, i) => {
        const circle = Sprite.from(CapitalQuizChoice);
        const head = iguanaHead(playerPuppetArgs());
        const text = IguaText.Large(x);
        const highlight = new Graphics().beginFill(0xffffff).drawRect(-6, -3, 192, 13);
        let highlitFrames = 0;

        const cc = container().withPixin(Dithered()).at(0, i * 20).withStep(() => {
            cc.visible = c.length > i;
            head.visible = c.selection === i;
            circle.visible = !head.visible;

            highlight.visible = c.picked && c.selection === i;
            text.tint = highlight.visible ? 0x005870 : 0xffffff;
            if (highlight.visible) {
                head.visible = false;
                highlitFrames += 1;
                cc.x = highlitFrames > 20 ? 0 : Math.abs(Math.sin(now.s * Math.PI * 6));
            }
        });

        highlight.at(0, 0).show(cc);
        circle.at(0, 0).show(cc);
        head.at(-6, -4).show(cc);
        text.at(14, -4).show(cc);
        cc.show(c);
    });

    return c;
}