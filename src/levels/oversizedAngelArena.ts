import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {OversizedClownArenaArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {oversizedClown} from "../gameObjects/oversizedClown";
import {wait} from "../cutscene/wait";
import {jukebox} from "../igua/jukebox";
import {Country, Hemaboss1, JungleMusic} from "../musics";
import {show} from "../cutscene/dialog";
import {makePseudo} from "../utils/math/makePseudo";
import {poppingRock} from "../gameObjects/poppingRock";
import {progress} from "../igua/data/progress";
import {slidingDoor} from "../gameObjects/slidingDoor";
import {decal} from "../gameObjects/decal";
import {CracksA, MirrorShard} from "../textures";
import {Sprite} from "pixi.js";
import {trimFrame} from "../utils/pixi/trimFrame";
import {player} from "../gameObjects/player";
import {cutscene} from "../cutscene/cutscene";
import {sparkly} from "../gameObjects/sparkleSmall";
import {CollectGeneric} from "../sounds";
import {persistence} from "../igua/data/persistence";
import {keepSavingValuables} from "../gameObjects/valuableTrove";

export function OversizedAngelArena() {
    scene.backgroundColor = 0x2F4B5E;
    scene.terrainColor = 0x0F2061;
    const level = applyOgmoLevel(OversizedClownArenaArgs);
    level.DesertGlow.tint = 0xF0F0B0;
    level.JungleGlow.tint = 0x8CC8F8;

    const doors = [level.RightBossWall, level.LeftBossWall].map(x => {
        x.tint = 0xAD4A43;
        return slidingDoor(x, false).openInstantly();
    });

    decal.instances.filter(x => x.texture === CracksA).forEach(x => x.tint = 0x213E51);

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

            progress.checkpointName = 'DefeatedBoss';
            await persistence.save();
            scene.gameObjectStage.withAsync(keepSavingValuables);
        });
    }

    if (!progress.flags.desert.costumeMirror.shardCollected)
        mirrorShard().at(clownV).show();

    const p = makePseudo(421);
    const v = [box.x - 16, box.y];

    for (let i = 0; i < 8; i++) {
        v.add(-(p.int() % 32) - 3);
        const dy = -(p.int() % 2);
        poppingRock(p).at(v.x, v.y + dy).ahead();
        if (i === 4)
            v.x = clownV.x - 16;
    }

    jukebox.stop().warm(Hemaboss1, Country, JungleMusic);
}

const Shard = trimFrame(MirrorShard);

function mirrorShard() {
    const flags = progress.flags.desert.costumeMirror;
    let visibleFrames = 0;
    const s = Sprite.from(Shard)
        .withStep(() => {
            const clown = oversizedClown.instances[0];
            if (clown)
                s.at(clown).add(66, 25);

            s.x = Math.max(88, Math.min(s.x, 576));
            s.y = Math.max(40, Math.min(s.y, 208));
        })
        .withStep(() => {
            s.visible = !flags.shardCollected && progress.flags.desert.defeatedOversizedAngel;
            if (s.visible) {
                sparkly(s);
                visibleFrames++;
            }
            if (s.visible && visibleFrames > 10 && player.collides(s)) {
                CollectGeneric.play();
                flags.shardCollected = true;
                s.destroy();
                cutscene.play(async () => {
                    await show('Got giant mirror shard.');
                })
            }
        });
    return s;
}