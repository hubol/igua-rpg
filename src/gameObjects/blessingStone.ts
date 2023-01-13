import {Graphics, Sprite} from "pixi.js";
import {ProgressBigKey} from "../igua/data/getCompletion";
import {progress} from "../igua/data/progress";
import {show} from "../cutscene/dialog";
import {sparkly} from "./sparkleSmall";
import {wait} from "../cutscene/wait";
import {CollectGeneric} from "../sounds";

export function blessingStone(s: Sprite, minNewGamePlus: number, bigKey: ProgressBigKey, rewardName: string) {
    s.withCutscene(async () => {
        if (progress.newGamePlus === minNewGamePlus - 1)
            return await show("It might do something next lifetime.");
        if (progress.newGamePlus < minNewGamePlus)
            return await show("It won't do anything this lifetime.");
        if (bigKey.reward)
            return await show(`You already received ${rewardName}.`);

        bigKey.reward = true;
        CollectGeneric.play();
        await show(`Received ${rewardName}.`);
    })
    .withAsync(async () => {
        await wait(() => progress.newGamePlus >= minNewGamePlus && !bigKey.reward);
        const g = new Graphics().beginFill(0).drawRect(7 - 13, -10, 10, 13).hide().show(s);
        sparkly(g);
        await wait(() => bigKey.reward);
        g.destroy();
    });
}