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
    level.Ronald.cutscene = async p => {
        await show("Hi, my name is Ronald.");
        await show("Welcome to IguaRPG.");
        await tickerSleep(1000);
        await show("En garde!");
        if (await p.ask("Are you happy today?"))
            await p.show("That's awesome.");
        else
            await p.show("That sucks.");

        if (await p.ask("What are you into?", ["CBT", "CBD"]) === "CBT")
            game.player.damage(20);
        else
            await p.show("Haha, cool.")
    };
    level.SecretDoor.locked = true;
    level.BottomLeftCrudeHouse.tint = 0x8888aa;
}

export function RightTest()
{
    const level = applyOgmoLevel(RightTestArgs);
    withSleepyBehavior(level.Gamer);
    game.cutscenePlayer.playCutscene(testCutscene);
}