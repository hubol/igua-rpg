import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {RightTestArgs, TestArgs} from "../levelArgs2";

export function Test()
{
    applyOgmoLevel(TestArgs);
}

export function RightTest()
{
    applyOgmoLevel(RightTestArgs);
}