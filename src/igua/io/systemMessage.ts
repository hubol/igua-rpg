import {IguaText} from "../text";
import {game} from "../game";
import {sleep} from "../../cutscene/sleep";
import {lerp} from "../../cutscene/lerp";

export function systemMessage(text: string, tint = 0xffffff) {
    const t = IguaText.Large(text, { tint })
        .at(2, 242)
        .show(game.hudStage)
        .withAsync(async () => {
            await sleep(1_000);
            await lerp(t, 'alpha').to(0).over(2_000);
            t.destroy();
        });
}