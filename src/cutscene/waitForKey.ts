import {game} from "../igua/game";
import {Key, KeyCode} from "../utils/key";
import {invisibleObject} from "../gameObjects/utils/invisibleObject";
import {CancellationToken} from "pissant";
import {tickerWait} from "../utils/tickerWait";

export async function waitForKey(keyCode: KeyCode, ct?: CancellationToken)
{
    let wasUp = false;
    let advance = false;

    const displayObject = invisibleObject().withStep(() => {
        if (wasUp && Key.justWentDown(keyCode))
            advance = true;
        if (Key.isUp(keyCode))
            wasUp = true;
    });
    game.stage.addChild(displayObject);

    await tickerWait(() => advance, ct);
    displayObject.destroy();
}