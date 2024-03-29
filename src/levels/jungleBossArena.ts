import {scene} from "../igua/scene";
import {JungleBossArenaArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {progress} from "../igua/data/progress";
import {clownUnorthodox} from "../gameObjects/clownUnorthodox";
import {spike} from "../gameObjects/spike";
import {slidingDoor} from "../gameObjects/slidingDoor";
import {player} from "../gameObjects/player";
import {wait} from "../cutscene/wait";
import {container} from "../utils/pixi/container";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {moveCameraToPlayerTarget} from "../igua/camera";
import {jukebox} from "../igua/jukebox";
import {Hemaboss1, JungleMusic, VolcanoCaveMusic} from "../musics";
import {keepSavingValuables} from "../gameObjects/valuableTrove";
import {persistence} from "../igua/data/persistence";
import {valuable} from "../gameObjects/valuable";
import {cracks} from "../gameObjects/cracks";
import {Undefined} from "../utils/types/undefined";
import {Container} from "pixi.js";
import {GameEvent} from "../igua/data/gameEvent";

export function JungleBossArena() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;

    jukebox.stop().warm(Hemaboss1, VolcanoCaveMusic, JungleMusic);

    progress.flags.jungle.usedBlessing = true;

    const level = applyOgmoLevel(JungleBossArenaArgs);

    const doors = [level.RightBossWall, level.LeftBossWall].map(x => slidingDoor(x, false).openInstantly());

    const bossMinX = level.BossCamera.x;
    const bossMaxX = bossMinX + 256;

    if (!progress.flags.jungle.defeatedUnorthodoxAngel && !progress.flags.global.somethingGreatHappened) {
        for (let x = bossMinX; x < bossMaxX; x += 16)
            spike(35).at(x, 64).show();

        const h = clownUnorthodox().at(bossMinX + 32, 164)
            .withAsync(async () => {
                await wait(() => h.aggressive);
                jukebox.play(Hemaboss1);
            });
        h.show();

        let limit = Undefined<Container>();

        scene.gameObjectStage.withAsync(async () => {
            await wait(() => player.collides(level.ActivateBossRegion));
            limit = container()
                .withStep(() => player.x = Math.max(Math.min(player.x, bossMaxX), bossMinX))
                .show(player);
            doors.forEach(x => x.startClosing(3));
            scene.camera.followPlayer = false;
            h.withAsync(async () => {
                await wait(() => Math.abs(scene.camera.x - bossMinX) < 50);
                h.aggressive = true;
            })
            await lerp(scene.camera, 'x').to(bossMinX).over(750);
        });
        scene.gameObjectStage.withAsync(async () => {
            await wait(() => h.destroyed);
            player.invulnerableFrameCount += 120;
            player.withStep(() => player.visible = true);
            await sleep(1);

            GameEvent.broadcast('defeatJungleBoss');
            progress.checkpointName = 'DefeatedBoss';
            progress.flags.jungle.defeatedUnorthodoxAngel = true;
            await persistence.save();
            scene.gameObjectStage.withAsync(keepValuableTroveInOkSpot);
            scene.gameObjectStage.withAsync(keepSavingValuables);
            jukebox.currentSong?.fade(1, 0, 1000);
            limit?.destroy();
            scene.gameObjectStage.withAsync(async () => {

            });
            scene.gameObjectStage.withAsync(async () => {
                for (const s of spike.instances) {
                    s.withStep(() => s.y -= 1);
                    await sleep(67);
                }
            })
            await sleep(125);
            doors.forEach(x => x.destroy());
            await moveCameraToPlayerTarget(2);
            scene.camera.followPlayer = true;
        })
    }

    cracks(3245.1269, 0x481018).show(scene.parallax1Stage);
}

async function keepValuableTroveInOkSpot() {
    await sleep(250);
    await wait(() => valuable.instances.length > 0);
    const container = valuable.instances[0].parent;
    if (container.y < 140)
        await lerp(container, 'y').to(140).over(1_000);
    if (container.y > 180)
        await lerp(container, 'y').to(180).over(1_000);
}