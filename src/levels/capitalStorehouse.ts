import {scene} from "../igua/scene";
import {CapitalStorehouseArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {CapitalMusicPlease, Hemaboss1, UnusualOminousMusic} from "../musics";
import {decalsOf} from "../gameObjects/decal";
import {Column, GroundSpeckles, KeyBlue} from "../textures";
import {filters, Sprite} from "pixi.js";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {dassmannBoss} from "../gameObjects/dassmannBoss";
import {progress} from "../igua/data/progress";
import {dassmann} from "../gameObjects/dassmann";
import {cutscene} from "../cutscene/cutscene";
import {wait} from "../cutscene/wait";
import {player} from "../gameObjects/player";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {show} from "../cutscene/dialog";
import {moveCameraToPlayerTarget} from "../igua/camera";
import {move} from "../cutscene/move";
import {OracleUnlockDoor} from "../sounds";

export function CapitalStorehouse() {
    scene.backgroundColor = 0xD0C8C0;
    scene.terrainColor = 0x888080;
    const level = applyOgmoLevel(CapitalStorehouseArgs);

    jukebox.play(UnusualOminousMusic).warm(CapitalMusicPlease, Hemaboss1);

    decalsOf(Column).forEach(x => x.opaqueTint = scene.terrainColor);
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x686060));
    const lighten = new filters.ColorMatrixFilter();
    lighten.brightness(1.3, false);
    lighten.saturate(-0.5, true);
    scene.parallax1Stage.filters = [lighten];

    enrichDassmannBoss(level);
}

function enrichDassmannBoss(level: GameObjectsType<typeof CapitalStorehouseArgs>) {
    const { capital } = progress.flags;

    if (capital.key.fromStorage)
        return;

    const key = Sprite.from(KeyBlue).at([32, -24].add(level.Dassmann)).show();

    if (capital.defeatedDassmann) {
        key.asCollectible(capital.key, 'fromStorage');
        return;
    }

    const d = dassmann().at(level.Dassmann).show();
    d.body.playFootsteps = true;
    key.index = d.index;

    async function dassmannIntroScene() {
        scene.camera.followPlayer = false;
        const camera = lerp(scene.camera, 'x').to(scene.width - 256).over(1000);
        await sleep(250);
        await show('I came here looking for the dark haired guy.');
        await sleep(500);
        await show("Do you even know what I'm talking about?");

        d.expression.facing = 'off';
        await Promise.all([
            lerp(d.head, 'face').to(1).over(125),
            lerp(d, 'x').to(key.x - 8).over(500)
        ]);
        await Promise.all([
            d.armr.raise().over(250),
            move(key).off(0, -8).over(250),
        ]);

        await sleep(250);
        d.expression.facing = 'auto';
        await show("I'm taking this as a souvenir.");

        key.destroy();

        await camera;

        scene.gameObjectStage.withAsync(beginBoss);
    }

    async function beginBoss() {
        level.Door.ext.showClosedMessage = false;
        level.Door.locked = true;
        jukebox.play(Hemaboss1);
        const p = d.vcpy();
        d.destroy();
        const boss = dassmannBoss().at(p).show();
        await moveCameraToPlayerTarget(5);
        scene.camera.followPlayer = true;
        await wait(() => boss.isDead);
        jukebox.currentSong?.fade(1, 0, 1000);
        level.Door.locked = false;
        OracleUnlockDoor.play();
    }

    scene.gameObjectStage.withAsync(async () => {
        await wait(() => player.x > d.x - 128);
        cutscene.play(dassmannIntroScene);
    })
}