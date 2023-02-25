import {scene} from "../igua/scene";
import {FinalBossArenaArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {CapitalMusicPlease, EmoWizard, Hemaboss1} from "../musics";
import {applyFinalFilters} from "./finalClimb";
import {clownOrnate} from "../gameObjects/clownOrnate";
import {wait} from "../cutscene/wait";
import {sleep} from "../cutscene/sleep";

export function FinalBossArena() {
    scene.backgroundColor = 0x182840;
    scene.terrainColor = 0x4868a0;
    const level = applyOgmoLevel(FinalBossArenaArgs);
    jukebox.play(EmoWizard).warm(CapitalMusicPlease, Hemaboss1);

    applyFinalFilters();
    scene.gameObjectStage.withAsync(beginBossBattle)
}

async function beginBossBattle() {
    const boss = clownOrnate().at(scene.width / 2, 32).show();
    await wait(() => boss.hostile);
    jukebox.play(Hemaboss1);
    await wait(() => boss.destroyed);
    jukebox.fadeOut(0, 1000);
    await sleep(1000);
    jukebox.play(EmoWizard);
}