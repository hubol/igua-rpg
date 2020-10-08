import {jukebox} from "../igua/jukebox";
import {Oracle} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertInnArgs} from "../levelArgs";
import {game} from "../igua/game";
import {progress} from "../igua/progress";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {Lazy} from "../igua/puppet/mods/lazy";
import {now} from "../utils/now";
import {lerp} from "../utils/math";

export function DesertInn()
{
    jukebox.play(Oracle);
    const level = applyOgmoLevel(DesertInnArgs);
    game.backgroundColor = 0xC08070;
    game.terrainColor = 0x702010;

    level.GlowingCircle.tint = 0xF0F0B0;
    [ level.CracksA, level.CracksA_1, level.CracksA_2 ].forEach(x => x.tint = 0xA05040);

    level.KeyRed.withStep(() => {
       level.KeyRed.angle = lerp(35, 55, (Math.sin(now.ms * 0.0025) + 1) / 2);
    });

    level.Innkeeper.mods.add(Lazy);
    level.Innkeeper.cutscene = async p => {
        if (await p.ask("Do you want to rest here? It costs 10 valuables."))
        {
            if (progress.valuables >= 10)
            {
                progress.valuables -= 10;
                await p.show("Thanks for resting here.");
                if (!level.RoomWall.destroyed)
                {
                    await p.move(level.RoomWall).to(level.RoomWall.x, level.RoomWall.y - level.RoomWall.height).over(1_000);
                    level.RoomWall.destroy();
                }

                await game.player.walkTo(level.SleepHere.x);
                await p.sleep(250);
                game.player.mods.add(Sleepy);
                await Promise.all([
                    p.wait(() => Math.min(progress.health += 0.25, progress.maxHealth) >= progress.maxHealth),
                    p.sleep(4_000) ]);
                await p.show("Full health restored!");
                game.player.mods.remove(Sleepy);
            }
            else
                await p.show("You dont have enough money.");
        }
        else
            await p.show("Come back later!")
    };
}