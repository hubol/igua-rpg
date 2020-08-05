import {show} from "./dialog";
import {game} from "../igua/game";
import {CancellationToken} from "../utils/cancellablePromise";
import {makePromiseLibrary} from "./promiseLibrary";

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

export async function testWithPromise(cancellationToken: CancellationToken)
{
    const {sleep} = makePromiseLibrary(cancellationToken);
    let i = 0;

    while (true)
    {
        console.log(i++);
        await sleep(1000);
    }
}