import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleDeepArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {spider} from "../gameObjects/spider";
import {jukebox} from "../igua/jukebox";
import {JungleMusic} from "../musics";
import {progress} from "../igua/data/progress";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles, VineSmall} from "../textures";
import {now} from "../utils/now";

export function JungleDeep() {
    jukebox.play(JungleMusic);
    scene.backgroundColor = 0x29444E;
    scene.terrainColor = 0x467022;
    const level = applyOgmoLevel(JungleDeepArgs);
    level.KeyYellow.asCollectible(progress.flags.jungle.key, 'fromSpider');
    spider(level.KeyYellow, [-1, -160], { downUnit: 0.07, upUnit: 0.06 }).ahead();
    decalsOf(GroundSpeckles).forEach(x => x.tint = 0xA0AD58);
    decalsOf(VineSmall).forEach(x => {
        if (x.x % 32 < 24)
            x.withStep(() => x.angle = Math.round(Math.sin(now.s * Math.PI + x.x * 24)) * 4);
    })
}
