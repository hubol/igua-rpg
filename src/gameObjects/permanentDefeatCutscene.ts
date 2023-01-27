import {disablePlayerCollision, recreatePlayerInPlace} from "./player";
import {flash} from "./flash";
import {sleep} from "../cutscene/sleep";
import {lerp} from "../cutscene/lerp";
import {jukebox} from "../igua/jukebox";
import {WeakToSpellsInstances} from "../pixins/weakToSpells";
import {showAll} from "../cutscene/dialog";
import {FinalDoorFinish} from "../sounds";
import {Screenshake} from "./earthquake";
import {Hemaboss1} from "../musics";

export async function permanentDefeatCutscene() {
    disablePlayerCollision();
    jukebox.fadeOut(0, 500);
    await sleep(1500);
    Screenshake.value.pivot.x = -1;
    Screenshake.value.duration = 1500;
    await sleep(1500);

    FinalDoorFinish.play();
    const f = flash(0xffffff, 1);
    while (WeakToSpellsInstances.value.length > 0) {
        WeakToSpellsInstances.value.pop()!.destroy();
    }
    await sleep(500)
    await lerp(f, 'alpha').to(0).over(1000);

    await sleep(500);
    if (jukebox.currentSong !== Hemaboss1)
        jukebox.fadeIn(0, 1000);
    await showAll('Something great has happened.',
        'Return to the wizard of emotion for your reward.');

    recreatePlayerInPlace();
}