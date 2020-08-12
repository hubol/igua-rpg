import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {RightTestArgs, TestArgs} from "../levelArgs";
import {testCutscene, testLevel} from "../cutscene/testScene";
import {game} from "../igua/game";
import {BitmapText} from "pixi.js";
import {AcrobatixFont} from "../fonts";

export function Test()
{
    applyOgmoLevel(TestArgs);
}

export function RightTest()
{
    applyOgmoLevel(RightTestArgs);

    setTimeout(testLevel);
    game.gameObjectStage.addChild(new BitmapText("Stupid fuck", { fontName: AcrobatixFont.font }).at(128, 128));
    game.cutscenePlayer.playCutscene(testCutscene());
}