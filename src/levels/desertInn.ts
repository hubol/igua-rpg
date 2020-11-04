import {jukebox} from "../igua/jukebox";
import {Oracle} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertInnArgs} from "../levelArgs";
import {progress} from "../igua/data/progress";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {Lazy} from "../igua/puppet/mods/lazy";
import {now} from "../utils/now";
import {lerp} from "../utils/math/number";
import { DragRock } from "../sounds";
import {scene} from "../igua/scene";
import {spendValuables} from "../igua/logic/spendValuables";
import {player} from "../gameObjects/player";

export function DesertInn()
{
    jukebox.play(Oracle);
    const level = applyOgmoLevel(DesertInnArgs);
    scene.backgroundColor = 0xC08070;
    scene.terrainColor = 0x702010;

    level.GlowingCircle.tint = 0xF0F0B0;
    [ level.CracksA, level.CracksA_1, level.CracksA_2 ].forEach(x => x.tint = 0xA05040);

    level.KeyRed
        .withStep(() => {
           level.KeyRed.angle = lerp(35, 55, (Math.sin(now.ms * 0.0025) + 1) / 2);
        })
        .asCollectible(progress.flags, "collectedInnKey");

    level.Innkeeper.mods.add(Lazy);
    level.Innkeeper.cutscene = async p => {
        if (await p.ask("Do you want to rest here? It costs 10 valuables."))
        {
            if (spendValuables(10))
            {
                await p.show("Thanks for resting here.");
                if (!level.RoomWall.destroyed)
                {
                    DragRock.play();
                    await p.move(level.RoomWall).to(level.RoomWall.x, level.RoomWall.y - level.RoomWall.height).over(1_000);
                    DragRock.stop();
                    level.RoomWall.destroy();
                }

                await player.walkTo(level.SleepHere.x);
                await p.sleep(250);
                player.mods.add(Sleepy);
                await Promise.all([
                    p.wait(() => (progress.health = Math.min(progress.health + 0.25, progress.maxHealth)) >= progress.maxHealth),
                    p.sleep(4_000) ]);
                await p.show("Full health restored!");
                player.mods.remove(Sleepy);
            }
            else
                await p.show("You dont have enough money.");
        }
        else
            await p.show("Come back later!")
    };
}