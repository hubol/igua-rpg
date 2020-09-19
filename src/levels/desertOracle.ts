import {jukebox} from "../igua/jukebox";
import {Oracle} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertOracleArgs} from "../levelArgs";

export function DesertOracle()
{
    jukebox.play(Oracle);
    const level = applyOgmoLevel(DesertOracleArgs);

    let talkedAlready = false;

    level.Oracle.cutscene = async p => {
        if (!talkedAlready)
        {
            await p.show("Hello. I am the oracle of the desert.");
            await p.show("I usually stay in the basement to stay closer to the core of the world.");
            talkedAlready = true;
        }
        if (await p.ask("Would you like some advice?"))
            await p.show("I don't have any advice right now.");
        else
            await p.show("That is okay.");
    };
}