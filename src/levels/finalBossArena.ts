import {scene} from "../igua/scene";
import {FinalBossArenaArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {CapitalMusicPlease, EmoWizard, Hemaboss1} from "../musics";
import {applyFinalFilters} from "./finalClimb";
import {clownOrnate} from "../gameObjects/clownOrnate";
import {wait} from "../cutscene/wait";
import {sleep} from "../cutscene/sleep";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import { slidingDoor } from "../gameObjects/slidingDoor";
import {SceneLocal} from "../igua/sceneLocal";
import {Dithered} from "../pixins/dithered";
import {lerp} from "../cutscene/lerp";
import {progress} from "../igua/data/progress";
import {persistence} from "../igua/data/persistence";
import {keepSavingValuables} from "../gameObjects/valuableTrove";

export function FinalBossArena() {
    scene.backgroundColor = 0x182840;
    scene.terrainColor = 0x4868a0;
    const level = applyOgmoLevel(FinalBossArenaArgs);
    jukebox.play(EmoWizard).warm(CapitalMusicPlease, Hemaboss1);

    applyFinalFilters(38.1269);

    mkBossDoors(level);
    if (!progress.flags.final.defeatedOrnateAngel)
        scene.gameObjectStage.withAsync(beginBossBattle)
}

function mkBossDoors(level: GameObjectsType<typeof FinalBossArenaArgs>) {
    const left = slidingDoor(level.BossWallLeft, true);
    const right = slidingDoor(level.BossWallRight, true);

    const doors = [left, right];

    for (const door of doors) {
        door.index = 0;
        (door as any).tint = 0xF0B020;
        door.openInstantly();
        door.withPixin(Dithered({ dither: 0 }))
    }

    scene.gameObjectStage.withAsync(async () => {
        await wait(() => FinalBossBattle.value.active);
        doors.forEach(x => {
            x.startClosing(100);
            x.withAsync(() => lerp(x as any, 'dither').to(1).over(500));
        });
        await wait(() => !FinalBossBattle.value.active);
        doors.forEach(x => x.startOpening(1));
    })
}

async function beginBossBattle() {
    const boss = clownOrnate().at(scene.width / 2, 192).show();
    await wait(() => !boss.awake);
    await wait(() => boss.awake);
    jukebox.fadeOut(0, 500);
    await wait(() => boss.hostile);
    FinalBossBattle.value.active = true;
    jukebox.play(Hemaboss1);
    await wait(() => boss.destroyed);

    FinalBossBattle.value.active = false;

    progress.flags.final.defeatedOrnateAngel = true;
    progress.checkpointName = "DefeatedBoss";
    await persistence.save();
    scene.gameObjectStage.withAsync(keepSavingValuables);

    jukebox.fadeOut(0, 1000);
    await sleep(1000);
    jukebox.play(EmoWizard);
}

const FinalBossBattle = new SceneLocal(() => ({ active: false }), `FinalBossBattle`);