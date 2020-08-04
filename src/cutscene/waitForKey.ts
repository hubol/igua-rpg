import {DisplayObject} from "pixi.js";
import {game} from "../igua/game";
import {Key, KeyCode} from "../utils/key";
import {wait} from "../utils/wait";

export async function waitForKey(keyCode: KeyCode)
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

    await wait(() => advance);
    displayObject.destroy();
}