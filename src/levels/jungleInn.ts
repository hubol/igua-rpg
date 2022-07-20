import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleInnArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {JungleInn as Music, JungleMusic} from "../musics";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles} from "../textures";
import {ChargeElectricBolt} from "../sounds";
import {progress} from "../igua/data/progress";
import {player} from "../gameObjects/player";
import {sleep} from "../cutscene/sleep";
import {chargeToRestAtInn} from "../igua/logic/restAtInn";
import {lerp} from "../cutscene/lerp";

export function JungleInn() {
    scene.backgroundColor = 0xB7B7E2;
    scene.terrainColor = 0x755E9B;
    const level = applyOgmoLevel(JungleInnArgs);
    const wall = level.MovingWall;
    wall.tint = 0xF54949;
    jukebox.play(Music).warm(JungleMusic);
    decalsOf(GroundSpeckles).forEach(x => x.tint = 0xEDE120);

    if (progress.checkpointName === "FromInnSave")
        wall.destroy();

    level.Innkeeper.cutscene = async () => {
        await chargeToRestAtInn(async () => {
            if (!wall.destroyed)
            {
                const id = ChargeElectricBolt.play();
                ChargeElectricBolt.rate(0.5, id);
                await lerp(wall, 'alpha').to(0).over(750);
                wall.destroy();
            }

            progress.checkpointName = "FromInnSave";
            await player.walkTo(level.SleepHere.x);
            await sleep(250);
        })
    };
}