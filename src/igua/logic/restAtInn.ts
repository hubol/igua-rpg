import {player} from "../../gameObjects/player";
import {Sleepy} from "../puppet/mods/sleepy";
import {wait} from "../../cutscene/wait";
import {progress} from "../data/progress";
import {sleep} from "../../cutscene/sleep";
import {show} from "../../cutscene/dialog";
import {InnRefresh} from "../../sounds";
import {persistence} from "../data/persistence";

export async function restAtInn() {
    player.mods.add(Sleepy);
    const fasterRest = !!progress.shopPurchases.SpicedNectar;
    const rate = fasterRest ? 0.75 : 0.25;
    const minMs = fasterRest ? 3_000 : 4_000;
    await Promise.all([
        wait(() => (progress.health = Math.min(progress.health + rate, progress.maxHealth)) >= progress.maxHealth),
        sleep(minMs) ]);
    await show("Full health restored!");
    InnRefresh.play();
    progress.poisonLevel = Math.min(progress.poisonLevel, 1);
    player.mods.remove(Sleepy);
    await persistence.save();
}
