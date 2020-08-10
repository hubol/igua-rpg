import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {RightTest as RightTestArgs, Test as TestArgs} from "../levels";

export function Test()
{
    applyOgmoLevel(TestArgs);
}

export function RightTest()
{
    applyOgmoLevel(RightTestArgs);
}