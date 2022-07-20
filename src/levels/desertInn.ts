import {jukebox} from "../igua/jukebox";
import {Bluehouse, Country} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertInnArgs} from "../levelArgs";
import {progress} from "../igua/data/progress";
import {Lazy} from "../igua/puppet/mods/lazy";
import {now} from "../utils/now";
import {lerp} from "../utils/math/number";
import { DragRock} from "../sounds";
import {scene} from "../igua/scene";
import {player} from "../gameObjects/player";
import {sleep} from "../cutscene/sleep";
import {move} from "../cutscene/move";
import {chargeToRestAtInn} from "../igua/logic/restAtInn";
import {cutOutWindow} from "../igua/cutOutWindow";

export function DesertInn()
{
    scene.backgroundColor = 0xC08070;
    scene.terrainColor = 0x702010;

    jukebox.play(Bluehouse).warm(Country);
    const level = applyOgmoLevel(DesertInnArgs);

    level.GlowingCircle.tint = 0xF0F0B0;
    [ level.CracksA, level.CracksA_1, level.CracksA_2 ].forEach(x => x.tint = 0xA05040);
    [level.PotteryOrange_1, level.PotteryOrange].forEach(x => x.hueShift = 20);

    if (progress.checkpointName === "FromInnSave")
        level.RoomWall.destroy();

    cutOutWindow(0xF0F0B0, level.Window);

    level.KeyRed
        .withStep(() => {
           level.KeyRed.angle = lerp(35, 55, (Math.sin(now.ms * 0.0025) + 1) / 2);
        })
        .asCollectible(progress.flags.desert.key, "fromInn");

    level.Innkeeper.mods.add(Lazy);
    level.Innkeeper.cutscene = async () => {
        await chargeToRestAtInn(async () => {
            if (!level.RoomWall.destroyed)
            {
                DragRock.play();
                await move(level.RoomWall).to(level.RoomWall.x, level.RoomWall.y - level.RoomWall.height).over(1_000);
                DragRock.stop();
                level.RoomWall.destroy();
            }

            progress.checkpointName = "FromInnSave";
            await player.walkTo(level.SleepHere.x);
            await sleep(250);
        })
    };
}
