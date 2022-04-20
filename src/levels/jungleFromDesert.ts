import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleFromDesertArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {Sprite} from "pixi.js";
import {decalsOf} from "../gameObjects/decal";
import {CloudLong, GroundSpeckles} from "../textures";
import {resolveBlock, resolvePipeHorizontal} from "../gameObjects/walls";
import {spider} from "../gameObjects/spider";
import {jukebox} from "../igua/jukebox";
import {ForestDeepMusic, JungleMusic, TickingTime} from "../musics";
import {biguaInJungle} from "../gameObjects/biguaInJungle";
import {rectangleDistance} from "../utils/math/rectangleDistance";
import {player} from "../gameObjects/player";
import {approachLinear} from "../utils/math/number";
import {wallpaper} from "../gameObjects/wallpaper";

export function JungleFromDesert() {
    jukebox.play(JungleMusic).warm(TickingTime, ForestDeepMusic);
    scene.backgroundColor = 0x97D8D8;
    scene.terrainColor = 0x79962E;
    const level = applyOgmoLevel(JungleFromDesertArgs);
    level.ToCave.tint = 0x2F4B5E;
    {
        const {x, y} = level.ToCaveBackground;
        const w = wallpaper(level.ToCaveBackground, 0x877856);
        scene.backgroundGameObjectStage.addChildAt(w, 0);
        resolveBlock({ x, y, width: 64, height: 16 } as any);
    }
    wallpaper(level.BehindPillar, 0x4B5B1D).behind();
    decalsOf(GroundSpeckles).forEach(x => x.tint = 0x877856);
    if (level.SpiderValuable)
        spider(level.SpiderValuable, [-1, -160], { downUnit: 0.05 }).show();
    const b = biguaInJungle().at(level.BiguaSpawn).show();
    b.scale.x = -1;
    decalsOf(CloudLong).forEach(secretCloud);
    level.DeepGlow.tint = 0x29444E;
}

function secretCloud(d: Sprite) {
    let framesNear = 0;
    let spawnedPipe = false;

    d.alpha = 0;
    d.withStep(() => {
        if (rectangleDistance(d, player) < 64)
            framesNear++;
        if (framesNear === 4 * 60) {
            const b = d.getBounds();
            const p = resolvePipeHorizontal({x: scene.camera.x + b.x, y: Math.round(scene.camera.y + b.y + b.height / 2), width: b.width, height: 8} as any);
            p.visible = false;
            spawnedPipe = true;
        }
        const targetAlpha = !spawnedPipe ? 0 : 1 - (rectangleDistance(d, player) / 128);
        d.alpha = Math.max(0, approachLinear(d.alpha, targetAlpha, 0.01));
    })
}