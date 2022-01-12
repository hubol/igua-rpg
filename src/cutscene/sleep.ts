import {game} from "../igua/game";
import {wait} from "./wait";

export function sleep(ms: number)
{
    let ticksUntilResolve = (ms / 1000) * game.maxFps;

    return wait(() => --ticksUntilResolve <= 0);
}
