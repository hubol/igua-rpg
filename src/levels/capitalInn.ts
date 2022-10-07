import {scene} from "../igua/scene";
import {CapitalInnArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {BlindHouse} from "../musics";
import {decalsOf} from "../gameObjects/decal";
import {CapitalArc} from "../textures";
import {BLEND_MODES, Graphics} from "pixi.js";
import {show, showAll} from "../cutscene/dialog";
import {ask} from "../cutscene/ask";
import {player} from "../gameObjects/player";
import {sleep} from "../cutscene/sleep";
import {lerp} from "../cutscene/lerp";
import {restAtInn} from "../igua/logic/restAtInn";
import {merge} from "../utils/object/merge";

export function CapitalInn() {
    scene.backgroundColor = 0xF0B020;
    scene.terrainColor = 0;
    const level = applyOgmoLevel(CapitalInnArgs);
    decalsOf(CapitalArc).forEach(x => x.tinted(0))
    jukebox.play(BlindHouse);

    new Graphics()
        .beginFill(0xDD6B40)
        .drawRect(36, 87 - 2, 179, 2)
        .drawRect(29, 97, 193, 5)
        .drawRect(31, 114, 196, 23)
        .behind();

    const moodLighting = merge(new Graphics(), { unit: 0 })
        .withStep(() => {
            moodLighting.alpha = Math.floor(moodLighting.unit * 5) / 5;
            moodLighting.alpha = moodLighting.alpha <= 0 ? 0 : moodLighting.alpha * 1.2;
        });
    moodLighting
        .beginFill(0x4040c0)
        .drawRect(0, 0, 256, 256)
        .ahead();
    moodLighting.blendMode = BLEND_MODES.MULTIPLY;

    level.Sign.title = 'Self-\nserve';
    level.Sign.cutscene = async () => {
        await showAll(
            'Welcome to the self-service inn at the capital.',
            'We believe in access to free, high-quality sleep for all.');
        if (!await ask('Would you like to rest here?'))
            return await show('Come back later!');
        scene.gameObjectStage.withAsync(async () => {
            await sleep(100)
            await lerp(moodLighting, 'unit').to(1).over(1000);
        });
        await player.walkTo(level.SleepHere.x);
        await restAtInn();
        scene.gameObjectStage.withAsync(() => lerp(moodLighting, 'unit').to(0).over(400));
    };
}