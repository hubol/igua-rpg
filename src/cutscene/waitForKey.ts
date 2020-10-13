import {game} from "../igua/game";
import {Key, KeyCode} from "../utils/browser/key";
import {invisibleObject} from "../gameObjects/utils/invisibleObject";
import {tickerWait} from "./tickerWait";
import {IguaPromiseConfig} from "./iguaPromiseConfig";

export async function waitForKey(keyCode: KeyCode, config?: IguaPromiseConfig)
{
    let wasUp = false;
    let advance = false;

    const displayObject = invisibleObject().withStep(() => {
        if (wasUp && Key.justWentDown(keyCode))
            advance = true;
        if (Key.isUp(keyCode))
            wasUp = true;
    });
    game.hudStage.addChild(displayObject);

    await tickerWait(() => advance, config)
        .finally(() => displayObject.destroy());
}