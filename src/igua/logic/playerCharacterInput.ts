import {cutscene} from "../../cutscene/cutscene";
import {Input} from "../io/input";

export function playerCharacterHasControl()
{
    return !cutscene.isPlaying;
}

export const PlayerCharacterInput: typeof Input = {
    justWentDown: key => playerCharacterHasControl() && Input.justWentDown(key),
    isDown: key => playerCharacterHasControl() && Input.isDown(key),
    isUp: key => !playerCharacterHasControl() || Input.isUp(key),
    justWentUp: key => !playerCharacterHasControl() ||  Input.justWentUp(key)
};