import {jukebox} from "../igua/jukebox";
import {Oracle} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertOracleArgs} from "../levelArgs";
import {game} from "../igua/game";

export function DesertOracle()
{
    jukebox.play(Oracle);
    const level = applyOgmoLevel(DesertOracleArgs);
    game.backgroundColor = 0x609090;
    game.terrainColor = 0x204040;

    [level.CracksA, level.CracksA_1, level.CracksA_2].forEach(x => x.tint = 0x406060);

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

    level.Oracle.withAsync(async p => {
        while (true)
        {
            await p.sleep(3_000);
            await level.Oracle.walkTo(92);
            await p.sleep(3_000);
            await level.Oracle.walkTo(50);
            await p.sleep(3_000);
            level.Oracle.scale.x = 1;
        }
    });
}