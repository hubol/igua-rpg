import {EscapeTickerAndExecute} from "../../utils/asshatTicker";
import {scene, sceneStack} from "../scene";
import {game} from "../game";
import {container} from "../../utils/pixi/container";
import {ask} from "../../cutscene/ask";
import {TitleScreen} from "../../levels/titleScreen";

export function showQuitMenu() {
    throw new EscapeTickerAndExecute(quitMenu);
}

function quitMenu() {
    scene.ticker.doNextUpdate = false;
    const c = container().withAsync(async () => {
        const yes = await ask('Do you want to quit to the title screen?');
        c.destroy();
        if (yes)
            sceneStack.replace(TitleScreen);
        else
            scene.ticker.doNextUpdate = true;
    });

    game.hudStage.addChild(c);
    game.hudStage.ticker.update();
}
