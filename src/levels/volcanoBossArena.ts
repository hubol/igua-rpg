import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {VolcanoBossArenaArgs} from "../levelArgs";
import {cracks} from "../gameObjects/cracks";
import {jukebox} from "../igua/jukebox";
import {AmbientLava, CapitalMusicPlease, Hemaboss1, VolcanoSomething} from "../musics";
import {heatWaves} from "../gameObjects/heatWaves";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles, VolcanoLever} from "../textures";
import {container} from "../utils/pixi/container";
import {lerp} from "../utils/math/number";
import {now} from "../utils/now";
import {progress} from "../igua/data/progress";
import {clownVile} from "../gameObjects/clownVile";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {wait} from "../cutscene/wait";
import {keepSavingValuables, trove140, ValuableTroveConfig} from "../gameObjects/valuableTrove";
import {sleep} from "../cutscene/sleep";
import {persistence} from "../igua/data/persistence";
import {freezeSceneAndShowMessage} from "../cutscene/freezeSceneAndShowMessage";
import {spikeVile} from "../gameObjects/spikeVile";
import {smallPop} from "../gameObjects/smallPop";
import {player} from "../gameObjects/player";
import {leverOpinionated} from "../gameObjects/lever";
import {ActivateLever} from "../sounds";
import {npc} from "../gameObjects/npc";
import {cutscene} from "../cutscene/cutscene";
import {show} from "../cutscene/dialog";
import {automaticDoorWithSfx} from "../gameObjects/automaticDoorWithSfx";
import {waitHold} from "../cutscene/waitHold";
import {GameEvent} from "../igua/data/gameEvent";

export function VolcanoBossArena() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;
    const level = applyOgmoLevel(VolcanoBossArenaArgs);
    jukebox.play(AmbientLava).warm(CapitalMusicPlease, VolcanoSomething);

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
        .asCollectible(progress.flags.volcano.key, "fromLava", () => freezeSceneAndShowMessage('Found temple key.'));

    if (!progress.flags.volcano.defeatedVileAngel && !progress.flags.global.somethingGreatHappened)
        enrichBoss(level);

    enrichBossDoor(level);
    enrichLever(level);
}

function enrichLever(level: GameObjectsType<typeof VolcanoBossArenaArgs>) {
    const { volcano } = progress.flags;
    const playerCameFromVolcano = player.x > 200;
    const canSpawnLeverPuller = playerCameFromVolcano || !volcano.defeatedVileAngel;

    function useLever() {
        if (volcano.openedPathToCapital) {
            cutscene.play(async () =>
                show(`The lever was already activated to open the path between the capital and volcano.`));
        }
        else {
            ActivateLever.play();
            volcano.openedPathToCapital = true;
        }
    }

    leverOpinionated(VolcanoLever, () => volcano.openedPathToCapital).at(level.Lever)
        .withInteraction(useLever)
        .show();

    scene.gameObjectStage.withAsync(async () => {
        await wait(() => canSpawnLeverPuller
            && volcano.defeatedVileAngel
            && !volcano.openedPathToCapital);
        await waitHold(() => !cutscene.isPlaying, 7);
        const guy = npc(level.SpawnLeverPuller.x, level.SpawnLeverPuller.y, 2).show();
        guy.engine.keepOnScreen = false;
        await guy.walkTo(level.Lever.x - 20);
        await sleep(300);
        useLever();
        await sleep(400);
        await guy.walkTo(level.SpawnLeverPuller.x);
        guy.destroy();
    });

}

function enrichBossDoor(level: GameObjectsType<typeof VolcanoBossArenaArgs>) {
    automaticDoorWithSfx(level.BossExit.tinted(0x6D1913), false, () => progress.flags.volcano.openedPathToCapital);
}

function enrichBoss(level: GameObjectsType<typeof VolcanoBossArenaArgs>) {
    const boss = clownVile().at(level.Boss).show();
    jukebox.warm(Hemaboss1);
    scene.gameObjectStage.withAsync(async () => {
        await wait(() => boss.hostile);
        jukebox.play(Hemaboss1);
    });
    scene.gameObjectStage.withAsync(async () => {
        let bossX = 0;
        boss.withStep(() => bossX = boss.x);
        await wait(() => boss.destroyed);
        spikeVile.instances.forEach(x => smallPop(12).at(x));
        spikeVile.destroyAll();
        progress.flags.volcano.defeatedVileAngel = true;
        progress.status.burn = 0;
        const x = Math.max(level.ValuableSpawnX.x, Math.min(level.ValuableSpawnX.x + level.ValuableSpawnX.width, bossX));
        ValuableTroveConfig.value.dropAll15 = boss.vsPlayerHitCount === 0;
        trove140().at(x, 168).show();

        GameEvent.broadcast('defeatVolcanoBoss');
        progress.checkpointName = "DefeatedBoss";
        await persistence.save();
        scene.gameObjectStage.withAsync(async () => {
            jukebox.currentSong?.fade(1, 0, 1000);
            await sleep(1000);
            jukebox.play(AmbientLava);
        });
        scene.gameObjectStage.withAsync(keepSavingValuables);
    })
}