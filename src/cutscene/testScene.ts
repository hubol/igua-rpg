import {show} from "./dialog";
import {game} from "../igua/game";
import {getLevelPromiseLibrary} from "../igua/level";

export async function testCutscene()
{
    await show("Hi!!!");
    await show("Welcome to IguaRPG");
    await show("Very fun !!!");
    game.cutscenePlayer.playCutscene(testCutscene2());
}

export async function testCutscene2()
{
    await show("HEY!!!!!! We love it");
    throw new Error("help");
}

export async function testLevel()
{
    const { sleep } = getLevelPromiseLibrary();
    let i = 0;

    while (true)
    {
        console.log(i++);
        await sleep(1000);
    }
}