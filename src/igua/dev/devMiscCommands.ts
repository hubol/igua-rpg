import {onKey} from "../../utils/browser/onKey";
import {showDevMessage} from "./showDevMessage";
import {progress} from "../data/progress";
import {container} from "../../utils/pixi/container";
import {game} from "../game";
import {range} from "../../utils/range";
import {IguaText} from "../text";
import {scene} from "../scene";
import {getWorldCenter} from "../gameplay/getCenter";

export function devMiscCommands()
{
    onKey('Digit1').up(async () => {
        progress.flags.global.somethingGreatHappened = !progress.flags.global.somethingGreatHappened;
        showDevMessage(`Set somethingGreatHappened to ${progress.flags.global.somethingGreatHappened}`);
    });

    onKey('Digit2').up(async () => {
        const c = container().show(game.hudStage);
        const texts = range(10).map(() => {
            const text = IguaText.Large('').show(c);
            text.tint = 0x0000ff;
            return text;
        });

        IguaText.Large('Show vsPlayerHitCount').show(c)

        c.withStep(() => {
            for (const text of texts) {
                text.visible = false;
            }

            let index = 0;
            for (const child of scene.gameObjectStage.children) {
                const count = child.vsPlayerHitCount;
                if (count < 1)
                    continue;

                const text = texts[index];
                text.text = '' + count;
                text.visible = true;
                text.at(getWorldCenter(child)).add(scene.camera, -1);
                index = (index + 1) % texts.length;
            }

        })
    });
}
