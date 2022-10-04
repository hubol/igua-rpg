import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleDeepArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {spider} from "../gameObjects/spider";
import {jukebox} from "../igua/jukebox";
import {ForestDeepMusic, JungleMusic} from "../musics";
import {progress} from "../igua/data/progress";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles, VineSmall} from "../textures";
import {now} from "../utils/now";
import {cameraLock} from "../gameObjects/cameraLock";
import {player} from "../gameObjects/player";
import {terrainGradient} from "../gameObjects/outerGradient";
import {region} from "../gameObjects/region";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {showAll} from "../cutscene/dialog";

export function JungleDeep() {
    jukebox.play(ForestDeepMusic).warm(JungleMusic);
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
    cameraLock({ maxX: level.CameraLock.x }, () => player.x > level.CameraLock.x);
    terrainGradient(region.instances, [0x406820, 0x406020, 0x384820]);
    enrichOutcast(level);
}

function enrichOutcast(level: GameObjectsType<typeof JungleDeepArgs>) {
    level.Outcast.cutscene = () => showAll(
        "Welcome to my home.",
        "I moved here when I got annoyed with the oracles. They said my interpretations of ancient texts were blasphemous.",
        "Did you know that the protectors were all slain by the claws of an Igua? Or that the guardian of flame nourished that Igua?",
        "The oracles act like the protectors were perfect and just mysteriously vanished, when their failures and demise are clearly documented.",
        "Honestly, I don't even think the great weapon exists. It's just an idea that the oracles cling to."
    );

    level.HintArrow.tinted(0xA0AD58).alpha = progress.levels.intelligence * 0.2;
}
