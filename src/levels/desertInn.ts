import {jukebox} from "../igua/jukebox";
import {Oracle} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertInnArgs} from "../levelArgs";
import {game} from "../igua/game";
import {progress} from "../igua/progress";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {Lazy} from "../igua/puppet/mods/lazy";

export function DesertInn()
{
    jukebox.play(Oracle);
    const level = applyOgmoLevel(DesertInnArgs);
    game.backgroundColor = 0xC08070;
    game.terrainColor = 0x702010;

    level.CracksA.tint = 0xA05040;
    level.CracksA_1.tint = level.CracksA.tint;

    level.Innkeeper.mods.add(Lazy);
    level.Innkeeper.cutscene = async p => {
        if (await p.ask("Do you want to rest here? It costs 10 valuables."))
        {
            if (progress.valuables >= 10)
            {
                progress.valuables -= 10;
                await p.show("Thanks for resting here.");
                await game.player.walkTo(level.Innkeeper.x + 64);
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