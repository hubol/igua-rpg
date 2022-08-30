import {game} from "../igua/game";
import {invisibleObject} from "../gameObjects/utils/invisibleObject";
import {wait} from "./wait";
import {Action, Input} from "../igua/io/input";

export async function waitForInput(action: Action)
{
    let wasUp = false;
    let advance = false;

    const displayObject = invisibleObject().withStep(() => {
        if (wasUp && Input.justWentDown(action))
            advance = true;
        if (Input.isUp(action))
            wasUp = true;
    });
    game.hudStage.addChild(displayObject);

    await wait(() => advance)
        .finally(() => displayObject.destroy());
}
