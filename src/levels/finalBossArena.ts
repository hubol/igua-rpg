import {scene} from "../igua/scene";
import {FinalBossArenaArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {CapitalMusicPlease, EmoWizard} from "../musics";
import {applyFinalFilters} from "./finalClimb";
import {clownOrnatePuppet} from "../gameObjects/clownOrnatePuppet";

export function FinalBossArena() {
    scene.backgroundColor = 0x182840;
    scene.terrainColor = 0x4868a0;
    const level = applyOgmoLevel(FinalBossArenaArgs);
    jukebox.play(EmoWizard).warm(CapitalMusicPlease);

    applyFinalFilters();
    clownOrnatePuppet().at(256, 192).show();
}