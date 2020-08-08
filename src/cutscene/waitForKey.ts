import {game} from "../igua/game";
import {Key, KeyCode} from "../utils/key";
import {invisibleObject} from "../gameObjects/utils/invisibleObject";
import {CancellationToken, wait} from "pissant";

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

    await wait(() => advance, ct);
    displayObject.destroy();
}