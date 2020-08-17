import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {RightTestArgs, TestArgs} from "../levelArgs";
import {testCutscene} from "../cutscene/testScene";
import {game} from "../igua/game";
import {show} from "../cutscene/dialog";
import {withSleepyBehavior} from "../gameObjects/npc";
import {tickerSleep} from "../utils/tickerSleep";

export function Test()
{
    const level = applyOgmoLevel(TestArgs);
    level.Ronald.cutscene = async () => {
        await show("Hi, my name is Ronald.");
        await show("Welcome to IguaRPG.");
        await tickerSleep(1000);
        await show("En garde!");
        game.player.damage(20);
    };
    level.SecretDoor.locked = true;
}

export function RightTest()
{
    const level = applyOgmoLevel(RightTestArgs);
    withSleepyBehavior(level.Gamer);
    game.cutscenePlayer.playCutscene(testCutscene());
}