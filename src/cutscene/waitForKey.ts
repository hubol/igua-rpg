import {DisplayObject} from "pixi.js";
import {game} from "../igua/game";
import {Key, KeyCode} from "../utils/key";
import {wait} from "../utils/wait";
import {CancellationToken} from "../utils/cancellablePromise";

export async function waitForKey(keyCode: KeyCode, ct?: CancellationToken)
{
    let wasUp = false;
    let advance = false;

    const displayObject = new DisplayObject();
    (displayObject as any).render = () => {};
    displayObject.withStep(() => {
        if (wasUp && Key.justWentDown(keyCode))
            advance = true;
        if (Key.isUp(keyCode))
            wasUp = true;
    });
    game.stage.addChild(displayObject);

    await wait(() => advance, ct);
    displayObject.destroy();
}