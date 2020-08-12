import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {RightTestArgs, TestArgs} from "../levelArgs";
import {testCutscene, testLevel} from "../cutscene/testScene";
import {game} from "../igua/game";
import {BitmapText} from "pixi.js";
import {AcrobatixFont} from "../fonts";
import {show} from "../cutscene/dialog";

export function Test()
{
    const level = applyOgmoLevel(TestArgs);
    level.Ronald.cutscene = async () => {
        await show("Hi, my name is Ronald.");
        await show("Welcome to IguaRPG.");
    };
}

export function RightTest()
{
    applyOgmoLevel(RightTestArgs);

    setTimeout(testLevel);
    game.gameObjectStage.addChild(new BitmapText("Stupid fuck", { fontName: AcrobatixFont.font }).at(128, 128));
    game.cutscenePlayer.playCutscene(testCutscene());
}