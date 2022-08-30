import {IguaText} from "../text";
import {game} from "../game";
import {Undefined} from "../../utils/types/undefined";
import {merge} from "../../utils/object/merge";

let textInstance = Undefined<ReturnType<typeof newText>>();

function newText() {
    let phase = 0;

    function setText(text: string, tint = 0xffffff) {
        phase = 0;
        t.text = text;
        t.tint = tint;
    }

    const t = merge(IguaText.Large(''), { setText } )
        .at(2, 242)
        .withStep(() => {
            if (phase < 0)
                return;
            phase += 1;
            if (phase < 60) {
                t.alpha = 1;
            }
            else if (phase < 60 * 3) {
                t.alpha -= 1 / 120;
            }
            else
                phase = -1;
        })
        .show(game.hudStage);

    return t;
}

export function systemMessage(text: string, tint = 0xffffff) {
    if (!textInstance)
        textInstance = newText();
    textInstance.setText(text, tint);
}