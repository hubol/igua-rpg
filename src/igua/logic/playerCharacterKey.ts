import {Key} from "../../utils/browser/key";
import {cutscene} from "../../cutscene/cutscene";

function playerCharacterHasControl()
{
    return !cutscene.isPlaying;
}

export const playerCharacterKey: typeof Key = {
    justWentDown: key => playerCharacterHasControl() && Key.justWentDown(key),
    isDown: key => playerCharacterHasControl() && Key.isDown(key),
    isUp: key => !playerCharacterHasControl() || Key.isUp(key),
    justWentUp: key => !playerCharacterHasControl() ||  Key.justWentUp(key)
};