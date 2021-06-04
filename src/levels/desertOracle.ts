import {jukebox} from "../igua/jukebox";
import {Oracle} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertOracleArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {show} from "../cutscene/dialog";
import {ask} from "../cutscene/ask";
import {sleep} from "../cutscene/sleep";

export function DesertOracle()
{
    jukebox.play(Oracle);
    const level = applyOgmoLevel(DesertOracleArgs);
    scene.backgroundColor = 0x609090;
    scene.terrainColor = 0x204040;

    level.GlowingCircle.tint = 0xF0F0B0;
    [level.CracksA, level.CracksA_1, level.CracksA_2].forEach(x => x.tint = 0x406060);

    let talkedAlready = false;

    level.Oracle.cutscene = async () => {
        if (!talkedAlready)
        {
            await show("Hello. I am the oracle of the desert.");
            await show("I usually stay in the basement to stay closer to the core of the world.");
            talkedAlready = true;
        }
        if (await ask("Would you like some advice?"))
            await show("I don't have any advice right now.");
        else
            await show("That is okay.");
    };

    level.Oracle.withAsync(async () => {
        while (true)
        {
            await sleep(3_000);
            await level.Oracle.walkTo(92);
            await sleep(3_000);
            await level.Oracle.walkTo(50);
            await sleep(3_000);
            level.Oracle.scale.x = 1;
        }
    });
}
