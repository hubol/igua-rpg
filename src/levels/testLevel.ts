import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {RightTestArgs, TestArgs} from "../levelArgs";

export function Test()
{
    applyOgmoLevel(TestArgs);
}

export function RightTest()
{
    applyOgmoLevel(RightTestArgs);
}