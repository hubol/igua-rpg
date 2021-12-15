import {player} from "../../gameObjects/player";
import {Sleepy} from "../puppet/mods/sleepy";
import {wait} from "../../cutscene/wait";
import {progress} from "../data/progress";
import {sleep} from "../../cutscene/sleep";
import {show} from "../../cutscene/dialog";
import {InnRefresh} from "../../sounds";

export async function restAtInn() {
    player.mods.add(Sleepy);
    await Promise.all([
        wait(() => (progress.health = Math.min(progress.health + 0.25, progress.maxHealth)) >= progress.maxHealth),
        sleep(4_000) ]);
    await show("Full health restored!");
    InnRefresh.play();
    progress.poisonLevel = 0;
    player.mods.remove(Sleepy);
}
