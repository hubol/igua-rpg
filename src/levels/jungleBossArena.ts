import {scene} from "../igua/scene";
import {JungleBossArenaArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {progress} from "../igua/data/progress";
import {fishingPole} from "../gameObjects/fishingPole";
import {Sprite} from "pixi.js";
import {UnorthodoxClownMock} from "../textures";
import {clownUnorthodox} from "../gameObjects/clownUnorthodox";
import {spike} from "../gameObjects/spike";
import {wave} from "../gameObjects/wave";
import {slidingDoor} from "../gameObjects/slidingDoor";
import {player} from "../gameObjects/player";
import {wait} from "../cutscene/wait";
import {container} from "../utils/pixi/container";
import {lerp} from "../cutscene/lerp";

export function JungleBossArena() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;

    progress.flags.jungle.usedBlessing = true;

    const level = applyOgmoLevel(JungleBossArenaArgs);

    const doors = [level.RightBossWall, level.LeftBossWall].map(x => slidingDoor(x, false).openInstantly());

    for (let x = 256; x < 512; x += 16)
        spike(35).at(x, 64).show();

    if (!progress.flags.jungle.defeatedUnorthodoxAngel) {
        const h = clownUnorthodox().at(256 + 32, 128).show();
        scene.gameObjectStage.withAsync(async () => {
            await wait(() => player.x < 500);
            const limit = container()
                .withStep(() => player.x = Math.max(Math.min(player.x, 512), 256))
                .show(player);
            doors.forEach(x => x.startClosing(3));
            scene.camera.followPlayer = false;
            h.withAsync(async () => {
                await wait(() => scene.camera.x < 300);
                h.aggressive = true;
            })
            await lerp(scene.camera, 'x').to(256).over(750);
            await wait(() => h.destroyed);
            limit.destroy();
            scene.camera.followPlayer = true;
            progress.flags.jungle.defeatedUnorthodoxAngel = true;
        })
    }

    // wave({ dx: 1, life: 15, count: 8, damage: 20, ms: 67, w1: 8, w2: 10, h1: 16, h2: 64 }).at(128, 128).show();

    // fishingPole().at(190, 180).show();

    // fishingPole().at(128, 240).show();

    // const m = Sprite.from(UnorthodoxClownMock).at(h).show();
    // m.alpha = 0.5;
}