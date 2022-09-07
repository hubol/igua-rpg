import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {VolcanoBossArenaArgs} from "../levelArgs";
import {cracks} from "../gameObjects/cracks";
import {jukebox} from "../igua/jukebox";
import {AmbientLava, Hemaboss1, VolcanoSomething} from "../musics";
import {heatWaves} from "../gameObjects/heatWaves";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles} from "../textures";
import {container} from "../utils/pixi/container";
import {lerp} from "../utils/math/number";
import {now} from "../utils/now";
import {progress} from "../igua/data/progress";
import {clownVile} from "../gameObjects/clownVile";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {wait} from "../cutscene/wait";
import {keepSavingValuables, trove140} from "../gameObjects/valuableTrove";
import {sleep} from "../cutscene/sleep";
import {persistence} from "../igua/data/persistence";
import {slidingDoor} from "../gameObjects/slidingDoor";

export function VolcanoBossArena() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;
    const level = applyOgmoLevel(VolcanoBossArenaArgs);
    jukebox.play(AmbientLava).warm(VolcanoSomething);

    const farBackStage = scene.parallax1Stage.parent.addChildAt(container(), scene.parallax1Stage.index).withStep(() => {
        farBackStage.at(0, 0).add(scene.camera, -0.8);
    });
    cracks(3299.1269, 0x481018).show(farBackStage);
    heatWaves(scene.width + 256, 80).at(-128, 256 - 30)
        .show(scene.parallax1Stage)
        .on('removed', () => farBackStage.destroy());
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x6D1913));

    level.Key
        .withStep(() => {
            level.Key.angle = lerp(35, 55, (Math.sin(now.ms * 0.0025) + 1) / 2);
        })
        .asCollectible(progress.flags.volcano.key, "fromLava");

    if (!progress.flags.volcano.defeatedVileAngel)
        enrichBoss(level);

    enrichBossDoor(level);
}

function enrichBossDoor(level: GameObjectsType<typeof VolcanoBossArenaArgs>) {
    const door = slidingDoor(level.BossExit.tinted(0x6D1913), false);
    const { volcano } = progress.flags;
    if (volcano.defeatedVileAngel)
        door.openInstantly();
    else
        door.withAsync(async () => {
            await wait(() => volcano.defeatedVileAngel);
            door.startOpening(0.3);
        })
}

function enrichBoss(level: GameObjectsType<typeof VolcanoBossArenaArgs>) {
    const boss = clownVile().at(level.Boss).show();
    jukebox.warm(Hemaboss1);
    scene.gameObjectStage.withAsync(async () => {
        await wait(() => boss.hostile);
        jukebox.play(Hemaboss1);
        let bossX = 0;
        boss.withStep(() => bossX = boss.x);
        await wait(() => boss.destroyed);
        progress.flags.volcano.defeatedVileAngel = true;
        progress.status.burn = 0;
        const x = Math.max(level.ValuableSpawnX.x, Math.min(level.ValuableSpawnX.x + level.ValuableSpawnX.width, bossX));
        trove140().at(x, 168).show();
        await persistence.save();
        scene.gameObjectStage.withAsync(async () => {
            jukebox.currentSong?.fade(1, 0, 1000);
            await sleep(1000);
            jukebox.play(AmbientLava);
        });
        scene.gameObjectStage.withAsync(keepSavingValuables);
    })
}