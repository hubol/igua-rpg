import {player} from "../../gameObjects/player";
import {Sleepy} from "../puppet/mods/sleepy";
import {wait} from "../../cutscene/wait";
import {progress} from "../data/progress";
import {sleep} from "../../cutscene/sleep";
import {show} from "../../cutscene/dialog";
import {InnRefresh} from "../../sounds";
import {persistence} from "../data/persistence";
import {ask} from "../../cutscene/ask";
import {spendValuables} from "./spendValuables";
import {derivedStats} from "../gameplay/derivedStats";

export async function restAtInn() {
    player.mods.add(Sleepy);
    const fasterRest = progress.levels.vigor > 0;
    let rate = fasterRest ? 0.75 : 0.25;
    if (progress.levels.vigor > 10)
        rate = derivedStats.maxHealth / 160;
    const minMs = fasterRest ? 3_000 : 4_000;
    await Promise.all([
        wait(() => (progress.health = Math.min(progress.health + rate, derivedStats.maxHealth)) >= derivedStats.maxHealth),
        sleep(minMs) ]);
    await show("Full health restored!");
    InnRefresh.play();
    progress.status.poison = Math.min(progress.status.poison, 1);
    player.mods.remove(Sleepy);
    await persistence.save();
}

export async function chargeToRestAtInn(beforeRestAtInn: () => Promise<unknown>, cost = 10) {
    if (await ask(`Do you want to rest here? It costs ${cost} valuables.`))
    {
        if (spendValuables(cost))
        {
            await show("Thanks for resting here.");
            await beforeRestAtInn();
            await restAtInn();
        }
        else
            await show("You don't have enough money.");
    }
    else
        await show("Come back later!")
}