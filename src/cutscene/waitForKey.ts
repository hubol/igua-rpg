import {game} from "../igua/game";
import {Key, KeyCode} from "../utils/browser/key";
import {invisibleObject} from "../gameObjects/utils/invisibleObject";
import {wait} from "./wait";

export async function waitForKey(keyCode: KeyCode)
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

    await wait(() => advance)
        .finally(() => displayObject.destroy());
}
