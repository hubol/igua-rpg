import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {OversizedClownArenaArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {oversizedClown} from "../gameObjects/oversizedClown";
import {wait} from "../cutscene/wait";
import {jukebox} from "../igua/jukebox";
import {Hemaboss1} from "../musics";
import {show} from "../cutscene/dialog";
import {makePseudo} from "../utils/makePseudo";
import {poppingRock} from "../gameObjects/poppingRock";
import {progress} from "../igua/data/progress";
import {slidingDoor} from "../gameObjects/slidingDoor";

export function OversizedAngelArena() {
    scene.backgroundColor = 0x2F4B5E;
    scene.terrainColor = 0x0F2061;
    const level = applyOgmoLevel(OversizedClownArenaArgs);
    level.DesertGlow.tint = 0xF0F0B0;
    level.JungleGlow.tint = 0x8CC8F8;

    const doors = [level.RightBossWall, level.LeftBossWall].map(x => {
        x.tint = 0xAD4A43;
        const door = slidingDoor(x, false);
        door.openInstantly();
        return door;
    });

    const box = level.PoppingRocksBox;

    box.withCutscene(async () => {
        await show('An empty box of popping rocks. Not useful.');
    });

    const clownV = [256 + 80, 128];
    if (!progress.flags.desert.defeatedOversizedAngel) {
        const clown = oversizedClown().at(clownV).show();

        scene.gameObjectStage.withAsync(async () => {
            await wait(() => clown.aggressive);
            doors.forEach(x => x.startClosing(2));
            jukebox.play(Hemaboss1);
            await wait(() => clown.destroyed);
            doors.forEach(x => x.startOpening(2));
            progress.flags.desert.defeatedOversizedAngel = true;
            jukebox.currentSong?.fade(1, 0, 1000);
        });
    }

    const p = makePseudo(421);
    const v = [box.x - 16, box.y];

    for (let i = 0; i < 8; i++) {
        v.add(-(p.int() % 32) - 3);
        const dy = -(p.int() % 2);
        poppingRock(p).at(v.x, v.y + dy).ahead();
        if (i === 4)
            v.x = clownV.x - 16;
    }

    jukebox.stop().warm(Hemaboss1);
}
