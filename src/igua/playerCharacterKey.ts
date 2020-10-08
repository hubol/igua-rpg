import {Key} from "../utils/browser/key";
import {game} from "./game";

function playerCharacterHasControl()
{
    return !game.cutscenePlayer.isPlayingCutscene;
}

export const playerCharacterKey: typeof Key = {
    justWentDown: key => playerCharacterHasControl() && Key.justWentDown(key),
    isDown: key => playerCharacterHasControl() && Key.isDown(key),
    isUp: key => !playerCharacterHasControl() || Key.isUp(key),
    justWentUp: key => !playerCharacterHasControl() ||  Key.justWentUp(key)
};