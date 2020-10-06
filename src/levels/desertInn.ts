import {jukebox} from "../igua/jukebox";
import {Oracle} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertInnArgs} from "../levelArgs";
import {game} from "../igua/game";
import {progress} from "../igua/progress";
import {Lazy} from "../gameObjects/npcMods";

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
                // TODO lol puppet needs to support mods
                progress.valuables -= 10;
                await p.show("Thanks for resting here.");
                await p.show("Full health restored!");
                progress.health = progress.maxHealth;
            }
            else
                await p.show("You dont have enough money.");
        }
        else
            await p.show("Come back later!")
    };
}